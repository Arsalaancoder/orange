// End-to-End Production Verification Test for Orange Paramedical CMS (D1 & R2)
import fs from 'fs';
import path from 'path';

const API_BASE = 'http://localhost:8787/api';
const AUTH_TOKEN = 'demo_jwt_token_orange_admin';

async function runE2ETest() {
  console.log('🚀 Starting End-to-End Cloudflare Integration Verification...');

  try {
    // ------------------------------------------------------------------------
    // STEP 1: Create Test Event ("Cloudflare Integration Test")
    // ------------------------------------------------------------------------
    console.log('\n--- Step 1: Creating Test Event in Cloudflare D1 ---');
    const eventPayload = {
      title: 'Cloudflare Integration Test',
      slug: 'cloudflare-integration-test',
      category: 'Workshop',
      event_date: '2026-11-01',
      start_time: '10:00 AM',
      end_time: '04:00 PM',
      venue: 'Medipally Auditorium',
      description: 'End-to-End verification test for D1 database integration',
      status: 'upcoming',
      image: '/images/student-life/student-life-cpr-workshop.jpg',
    };

    const createEventRes = await fetch(`${API_BASE}/admin/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(eventPayload),
    });

    if (!createEventRes.ok) {
      const errText = await createEventRes.text();
      throw new Error(`Failed to create event in D1: ${createEventRes.status} - ${errText}`);
    }

    const createEventData = await createEventRes.json();
    const eventId = createEventData.id;
    console.log(`✅ Event successfully created in D1! ID: ${eventId}`);

    // ------------------------------------------------------------------------
    // STEP 2: Fetch /api/events and confirm record returns
    // ------------------------------------------------------------------------
    console.log('\n--- Step 2: Fetching /api/events from Public Worker Endpoint ---');
    const getEventsRes = await fetch(`${API_BASE}/events`);
    if (!getEventsRes.ok) {
      throw new Error(`Failed to fetch /api/events: ${getEventsRes.status}`);
    }
    const eventsData = await getEventsRes.json();
    const foundEvent = eventsData.data.find((e) => e.title === 'Cloudflare Integration Test');

    if (!foundEvent) {
      throw new Error('❌ Test event "Cloudflare Integration Test" was NOT returned by /api/events!');
    }
    console.log('✅ Confirmed test event returned by /api/events:', foundEvent.title);

    // ------------------------------------------------------------------------
    // STEP 3: Upload Image to Cloudflare R2 Storage
    // ------------------------------------------------------------------------
    console.log('\n--- Step 3: Uploading Test Image to Cloudflare R2 Storage ---');
    const pngBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );
    const blob = new Blob([pngBuffer], { type: 'image/png' });
    const formData = new FormData();
    formData.append('file', blob, 'test_image.png');
    formData.append('folder', 'gallery');

    const uploadRes = await fetch(`${API_BASE}/admin/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: formData,
    });

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      throw new Error(`R2 Upload failed: ${uploadRes.status} - ${errText}`);
    }

    const uploadData = await uploadRes.json();
    console.log('✅ R2 Upload Success! URL:', uploadData.url, '| Key:', uploadData.key);

    // ------------------------------------------------------------------------
    // STEP 4: Verify Object Exists in R2 Storage
    // ------------------------------------------------------------------------
    console.log('\n--- Step 4: Verifying Image Retrieval from R2 Endpoint ---');
    const imageServeRes = await fetch(`http://localhost:8787${uploadData.url}`);
    if (!imageServeRes.ok) {
      throw new Error(`Failed to serve uploaded R2 image: ${imageServeRes.status}`);
    }
    console.log('✅ R2 image object fetched successfully! Status:', imageServeRes.status);

    // ------------------------------------------------------------------------
    // STEP 5: Store Gallery Metadata in D1 Database
    // ------------------------------------------------------------------------
    console.log('\n--- Step 5: Inserting Gallery Metadata into D1 Database ---');
    const galleryPayload = {
      title: 'Cloudflare E2E Gallery Test Photo',
      caption: 'Testing R2 binary upload + D1 metadata linking',
      category: 'campus',
      image_url: uploadData.url,
      r2_key: uploadData.key,
      display_order: 99,
    };

    const createGalleryRes = await fetch(`${API_BASE}/admin/gallery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(galleryPayload),
    });

    if (!createGalleryRes.ok) {
      const errText = await createGalleryRes.text();
      throw new Error(`Failed to insert gallery metadata in D1: ${createGalleryRes.status} - ${errText}`);
    }

    const createGalleryData = await createGalleryRes.json();
    const galleryId = createGalleryData.id;
    console.log(`✅ Gallery metadata record created in D1! ID: ${galleryId}`);

    // ------------------------------------------------------------------------
    // STEP 6: Confirm Gallery Record on Public Endpoint /api/gallery
    // ------------------------------------------------------------------------
    console.log('\n--- Step 6: Fetching /api/gallery Public Endpoint ---');
    const getGalleryRes = await fetch(`${API_BASE}/gallery`);
    if (!getGalleryRes.ok) {
      throw new Error(`Failed to fetch /api/gallery: ${getGalleryRes.status}`);
    }
    const galleryData = await getGalleryRes.json();
    const foundGallery = galleryData.data.find((g) => g.title === 'Cloudflare E2E Gallery Test Photo');

    if (!foundGallery) {
      throw new Error('❌ Test photo "Cloudflare E2E Gallery Test Photo" NOT returned by /api/gallery!');
    }
    console.log('✅ Confirmed gallery record returned by /api/gallery:', foundGallery.title);

    // ------------------------------------------------------------------------
    // STEP 7: Delete Test Records & Verify Clean Up
    // ------------------------------------------------------------------------
    console.log('\n--- Step 7: Cleaning up Test Records from D1 & R2 ---');
    const deleteEventRes = await fetch(`${API_BASE}/admin/events/${eventId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    if (!deleteEventRes.ok) {
      throw new Error(`Failed to delete test event: ${deleteEventRes.status}`);
    }
    console.log('✅ Test event deleted from D1!');

    const deleteGalleryRes = await fetch(`${API_BASE}/admin/gallery/${galleryId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
    });
    if (!deleteGalleryRes.ok) {
      throw new Error(`Failed to delete test gallery record: ${deleteGalleryRes.status}`);
    }
    console.log('✅ Test gallery item & R2 asset deleted!');

    console.log('\n🎉 ALL END-TO-END PRODUCTION VERIFICATION TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('\n❌ E2E Verification Failed:', err);
    process.exit(1);
  }
}

runE2ETest();
