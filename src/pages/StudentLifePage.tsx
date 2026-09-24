import React, { useEffect, useState } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { Container } from '@/components/shared/Container';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { studentLifeData } from '@/data/studentLife';
import { StudentLifeCarousel } from '@/components/student-life/StudentLifeCarousel';
import { api } from '@/services/api';
import type { EventItem } from '@/services/api';
import { Calendar, MapPin, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { softPopUpVariant, staggeredContainerVariant } from '@/lib/motionVariants';

export const StudentLifePage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api.getEvents().then((data) => {
      if (isMounted) {
        setEvents(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageShell title="Student Life & Campus Events" description="Explore seminars, health camps, workshops, and community outreach at Orange Group Nursing & Paramedical Colleges.">
      <section className="section-padding bg-white">
        <Container>
          <SectionHeading
            eyebrow="Beyond the Classroom"
            title="Holistic Professional Growth"
            subtitle="Engaging student activities including clinical workshops, seminars, health awareness drives, and academic competitions."
          />

          {/* 3D Coverflow Fan Arc Carousel */}
          <StudentLifeCarousel activities={studentLifeData} />
        </Container>
      </section>

      {/* Live Campus Events Section */}
      <section className="section-padding bg-[#FAFAF8] border-t border-[#E3E6E5]">
        <Container>
          <SectionHeading
            eyebrow="Upcoming Schedule"
            title="Workshops, Seminars & Health Camps"
            subtitle="Participate in specialized clinical workshops, emergency life support training, and medical awareness sessions."
          />

          {loading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-2" />
              <p className="text-xs font-medium text-[#667085]">Fetching upcoming scheduled workshops...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="p-10 text-center bg-white rounded-2xl border border-[#E3E6E5] max-w-md mx-auto">
              <Calendar className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-[#202426]">No upcoming workshops scheduled at present.</p>
            </div>
          ) : (
            <motion.div
              variants={staggeredContainerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {events.map((event) => (
                <motion.div key={event.id} variants={softPopUpVariant}>
                  <div className="bg-white rounded-2xl border border-[#E3E6E5] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between h-full group">
                    <div>
                      <div className="relative h-48 bg-slate-100 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                          {event.category}
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{event.event_date}</span>
                          <span>•</span>
                          <span className="font-medium text-[#667085]">{event.start_time} - {event.end_time}</span>
                        </div>

                        <h3 className="text-lg font-bold text-[#202426] leading-snug group-hover:text-emerald-700 transition-colors">
                          {event.title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs text-[#667085]">
                          <MapPin className="w-3.5 h-3.5 text-[#F26A21] shrink-0" />
                          <span className="font-medium truncate">{event.venue}</span>
                        </div>

                        <p className="text-sm text-[#667085] leading-relaxed line-clamp-3">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </Container>
      </section>
    </PageShell>
  );
};
