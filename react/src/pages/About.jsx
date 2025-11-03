// src/About.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import {
  FaInfoCircle,
  FaBullseye,
  FaLightbulb,
  FaCogs,
  FaHandsHelping,
  FaCheckCircle,
  FaTools,
  FaLaptopCode,
  FaTags,
  FaWrench,
  FaMobileAlt,
  FaShieldAlt,
} from "react-icons/fa";


const slideCardClass =
  "rounded-2xl shadow-lg p-8 h-full flex flex-col justify-start space-y-4 bg-white";

const Zero = ({loggedIn}) => {
  return (
    <div className="bg-gradient-to-b from-white to-yellow-50 text-stone-800 py-16">
      <div className="text-center mb-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          About{" "}
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Honda Vehicle Booking Service
          </span>
        </h1>
        <p className="text-lg text-stone-700 max-w-3xl mx-auto">
          A one-stop platform for scheduling Honda servicing and repairs —
          combining transparent pricing, genuine parts, and certified
          technicians with a seamless digital experience.
        </p>
      </div>
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-12">
        <Swiper
          modules={[Pagination, Autoplay]}
          
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop
          spaceBetween={24}
          slidesPerView={1}

        >
          <SwiperSlide>
            <div className="flex flex-col md:flex-row gap-8 justify-between items-center min-h-[300px]">
              <div className={slideCardClass + " md:basis-1/2"}>
                <div className="flex items-center mb-2">
                  <FaInfoCircle className="text-yellow-600 text-3xl mr-3" />
                  <h2 className="text-2xl font-semibold">Who We Are</h2>
                </div>
                <p className="text-stone-700 leading-relaxed text-justify mb-1">
                  Honda Vehicle Booking Service is a user-friendly digital
                  solution that helps Honda owners book and manage vehicle
                  maintenance — from routine check-ups to comprehensive repairs.
                  We partner with authorized Honda centers to deliver quality,
                  transparency, and peace of mind.
                </p>
                <p className="text-stone-700 leading-relaxed text-justify">
                  Our priority: safety, reliability, and a straightforward
                  experience — every mile, every service.
                </p>
              </div>

              <div className="md:basis-1/2 w-full max-w-lg rounded-2xl overflow-hidden shadow-md flex justify-center items-center aspect-video bg-gray-50">
                <img
                  src="https://user-gen-media-assets.s3.amazonaws.com/seedream_images/7b5a8787-892a-4546-860b-f035881a5a22.png"
                  alt="Honda Service"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-col md:flex-row gap-8 justify-between items-center min-h-[300px]">
              <div className={slideCardClass + " md:basis-1/2"}>
                <div className="flex items-center mb-2">
                  <FaBullseye className="text-yellow-600 text-3xl mr-3" />
                  <h2 className="text-2xl font-semibold">Trusted Network</h2>
                </div>
                <p className="text-stone-700 leading-relaxed text-justify">
                  We connect you to authorized Honda service centers and
                  certified technicians who use genuine parts — protecting your
                  warranty and ensuring long-term vehicle performance.
                </p>
              </div>
              <div className="md:basis-1/2 w-full max-w-lg rounded-2xl overflow-hidden shadow-md flex justify-center items-center aspect-video bg-gray-50">
                <img
                  src="Q.png"
                  alt="Trusted Image"
                  className="w-full  md:h-[289px] rounded-2xl"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="max-w-6xl mx-auto px-6 mb-12 grid md:grid-cols-2 gap-8">
        <div className={slideCardClass + " bg-yellow-100"}>
          <div className="flex items-center">
            <FaBullseye className="text-yellow-600 text-3xl mr-3" />
            <h3 className="text-2xl font-semibold">Our Mission</h3>
          </div>
          <p className="text-stone-700 leading-relaxed text-justify">
            Simplify vehicle servicing through an easy-to-use digital platform
            that prioritizes trust, speed, and clear communication between the
            customer and authorized service centers.
          </p>
          <p className="text-stone-700 leading-relaxed text-justify">
            We aim to make routine maintenance predictable, affordable, and
            reliable for all Honda owners.
          </p>
        </div>

        <div className={slideCardClass + " bg-white"}>
          <div className="flex items-center">
            <FaLightbulb className="text-yellow-600 text-3xl mr-3" />
            <h3 className="text-2xl font-semibold">Our Vision</h3>
          </div>
          <p className="text-stone-700 leading-relaxed text-justify">
            Build a nationwide digital ecosystem that helps every Honda owner
            proactively care for their vehicle — maximizing safety, longevity,
            and value with minimal friction.
          </p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <div className="rounded-2xl shadow-lg p-8 bg-white">
          <div className="flex items-center mb-4">
            <FaCogs className="text-yellow-600 text-3xl mr-3" />
            <h3 className="text-2xl font-semibold">How It Works</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ul className="list-decimal list-disc ml-6 space-y-2 text-stone-700 leading-relaxed">
              <li>Register or log in to your Honda account.</li>
              <li>Select your vehicle and service type.</li>
              <li>Choose nearby authorized service center.</li>
            </ul>

            <ul className="list-decimal list-disc ml-6 space-y-2 text-stone-700 leading-relaxed">
              <li>Pick a date & confirm the appointment.</li>
              <li>Track progress and receive completion notifications.</li>
              <li>Get digital invoice and next-service reminders.</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          What We Provide
        </h3>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 1000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          loop
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {[
            {
              id: 1,
              icon: <FaTools className="text-yellow-600 text-3xl" />,
              title: "Complete Maintenance",
              body: "Oil changes, brake checks, engine diagnostics, and scheduled maintenance — performed by certified technicians.",
            },
            {
              id: 2,
              icon: <FaLaptopCode className="text-yellow-600 text-3xl" />,
              title: "Online Booking & Tracking",
              body: "Easy appointment scheduling, real-time progress updates, and quick rescheduling when you need it.",
            },
            {
              id: 3,
              icon: <FaTags className="text-yellow-600 text-3xl" />,
              title: "Transparent Pricing",
              body: "Clear cost breakdowns before booking — no hidden charges. Seasonal offers and loyalty benefits available.",
            },
            {
              id: 4,
              icon: <FaWrench className="text-yellow-600 text-3xl" />,
              title: "Genuine Parts",
              body: "We use only genuine Honda parts to protect vehicle performance and warranty integrity.",
            },
            {
              id: 5,
              icon: <FaMobileAlt className="text-yellow-600 text-3xl" />,
              title: "Real-time Notifications",
              body: "Receive timely communications for each stage — inspection, servicing, QC, and delivery.",
            },
            {
              id: 6,
              icon: <FaShieldAlt className="text-yellow-600 text-3xl" />,
              title: "Safety & Assurance",
              body: "Sanitized work areas, verified technicians, and documentation for every service performed.",
            },
          ].map((card) => (
            <SwiperSlide key={card.id} className="!h-auto">
              <div className="p-6 h-full rounded-2xl bg-white shadow hover:shadow-lg transition">
                <div className="flex items-center mb-4">{card.icon}</div>
                <h4 className="font-semibold text-lg mb-2">{card.title}</h4>
                <p className="text-stone-700 text-sm leading-relaxed">
                  {card.body}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="max-w-6xl mx-auto px-6 mb-12">
        <div className="rounded-2xl shadow-lg p-8 bg-white">
          <div className="flex items-center mb-4">
            <FaHandsHelping className="text-yellow-600 text-3xl mr-3" />
            <h3 className="text-2xl font-semibold">Why Choose Us</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ul className="list-disc ml-6 space-y-2 text-stone-700 leading-relaxed">
              <li>
                Authorized Honda service centers and certified technicians.
              </li>
              <li>Genuine parts that retain warranty and performance.</li>
              <li>Clear pricing and online estimates before you book.</li>
            </ul>

            <ul className="list-disc ml-6 space-y-2 text-stone-700 leading-relaxed">
              <li>Secure digital payments & instant receipts.</li>
              <li>
                Eco-friendly handling and customer-first service policies.
              </li>
              <li>
                Responsive customer support and feedback-driven improvements.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Customer Benefits
        </h3>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 1000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop
        >
          {[
            "Time-saving and user-friendly experience",
            "Full digital service history & invoices",
            "Service reminders & loyalty offers",
            "Secure payments and instant invoices",
            "Trusted authorized service centers",
            "Responsive help & rescheduling",
          ].map((pt, idx) => (
            <SwiperSlide key={idx} className="!h-auto">
              <div className="p-6 rounded-2xl bg-white shadow hover:shadow-lg transition h-full">
                <div className="flex items-start gap-4">
                  <FaCheckCircle className="text-yellow-600 text-2xl mt-1" />
                  <p className="text-stone-700">{pt}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <div className="text-center mt-8 px-6">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">
          Ready to Experience Effortless Honda Servicing?
        </h3>
        <a
          href="/login"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-2xl font-semibold transition"
          aria-label="Book your service"
        >
          Book Your Service Now
        </a>
      </div>
      <div className="h-12" />
    </div>
  );
};

export default Zero;