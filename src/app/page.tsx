"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  PieChart,
  Bell,
  CreditCard,
  Play,
  Calendar,
  ShoppingBag,
  Car,
  Home,
  Utensils,
  HeartPulse,
  Plane,
  Briefcase,
  MoreHorizontal,
  Star,
  Video,
  Mic,
  PhoneOff,
} from "lucide-react";

export default function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(1);

  const testimonials = [
    {
      id: 0,
      name: "Sarah Jenkins",
      role: "Freelance Designer",
      avatar: "/images/avatar-1.jpg",
      text: "Finora completely changed the way I handle irregular freelance income. Being able to set dynamic monthly spending buckets and seeing exactly what I have left to spend each day removed all my financial anxiety.",
    },
    {
      id: 1,
      name: "Albert Monica",
      role: "Product Manager",
      avatar: "/images/avatar-3.jpg",
      text: "As someone who struggled to track daily cashflow across 3 different bank accounts and e-wallets, Finora gave me complete clarity. The budget alerts helped me save 30% more each month, and the interface is super clean and fun to use!",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer",
      avatar: "/images/avatar-2.jpg",
      text: "The savings goal tracker is incredible. Seeing my progress bar fill up as I allocate money to my vacation fund kept me disciplined. It is hands down the simplest and most beautiful personal finance tool.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1E293B] font-valley antialiased selection:bg-[#FBBF24]/30 selection:text-[#1E293B]">
      {/* 1. TOP YELLOW ANNOUNCEMENT BAR */}
      <div className="bg-[#FBBF24] py-2.5 px-4 text-center text-xs sm:text-sm font-bold text-[#1E293B] flex items-center justify-center gap-2 shadow-xs">
        <span>Are you looking for an easy, smart way to master your daily finances?</span>
        <Link
          href="/register"
          className="underline hover:text-black font-extrabold transition-colors inline-flex items-center gap-1"
        >
          Try Finora for free →
        </Link>
      </div>

      {/* 2. NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight text-[#1E293B]">
              Finora
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#475569]">
            <a href="#home" className="text-[#2563EB] font-bold transition-colors">
              Home
            </a>
            <a href="#benefits" className="hover:text-[#2563EB] transition-colors">
              Benefits
            </a>
            <a href="#budgeting" className="hover:text-[#2563EB] transition-colors">
              Budgeting
            </a>
            <a href="#categories" className="hover:text-[#2563EB] transition-colors">
              Categories
            </a>
            <a href="#reviews" className="hover:text-[#2563EB] transition-colors">
              Reviews
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-bold text-[#475569] hover:text-[#2563EB] transition-colors px-3 py-2"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="px-6 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold shadow-md shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section id="home" className="pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Copy & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              {/* Orange Kicker */}
              <div>
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#F59E0B]">
                  100% SMART & SIMPLE FINANCE
                </span>
              </div>

              {/* Main Headline with Blue Butterfly/Leaf Doodle */}
              <div className="relative">
                <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#1E293B] leading-[1.12] tracking-tight">
                  Find Your <br />
                  <span className="relative inline-block">
                    Financial Balance
                    {/* Hand-drawn blue leaf / butterfly doodle SVG */}
                    <svg
                      className="absolute -top-3 -right-10 w-9 h-9 text-[#2563EB]"
                      viewBox="0 0 40 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M20 28C14 26 8 20 12 12C16 4 24 10 20 28Z" />
                      <path d="M20 28C26 26 32 20 28 12C24 4 16 10 20 28Z" />
                      <path d="M20 28V36" />
                    </svg>
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#64748B] font-medium leading-relaxed max-w-lg">
                We help you track daily expenses, set realistic monthly budgets, and grow your savings effortlessly. 100% free, private, and simple to use.
              </p>

              {/* CTA Buttons Group */}
              <div className="pt-2 flex flex-wrap items-center gap-5">
                <Link
                  href="/register"
                  className="px-7 py-3.5 rounded-full bg-[#FBBF24] hover:bg-[#F59E0B] text-[#1E293B] font-extrabold text-sm tracking-wide shadow-md shadow-amber-500/20 hover:shadow-amber-500/35 hover:-translate-y-0.5 transition-all"
                >
                  Get started
                </Link>

                <a
                  href="#budgeting"
                  className="flex items-center gap-2.5 text-sm font-extrabold text-[#1E293B] hover:text-[#2563EB] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  </div>
                  <span>See how it works</span>
                </a>
              </div>
            </div>

            {/* Right Column: 2x2 Playful Pastel Photo Grid with Doodles */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Top-Right Yellow Circle Background Accent */}
                <div className="absolute -top-6 right-6 w-28 h-28 bg-[#FEF08A] rounded-full -z-10 opacity-70" />

                {/* Top-Right Yellow Doodle Triangle */}
                <div className="absolute -top-4 -right-4 text-[#F59E0B] -z-10">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="16,4 28,26 4,26" />
                  </svg>
                </div>

                {/* Left Blue Squiggle Doodle */}
                <div className="absolute top-1/2 -left-8 text-[#2563EB] -z-10 select-none">
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M2 12C6 6 10 18 14 12C18 6 22 18 26 12C30 6 34 18 38 12" />
                  </svg>
                </div>

                {/* 2x2 Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Photo 1: Top-Left (Sky Blue background with top-left arch) */}
                  <div className="relative aspect-square rounded-tl-[48px] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl overflow-hidden shadow-lg border-2 border-white bg-[#BAE6FD] hover:scale-[1.02] transition-transform">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/hero-1.jpg"
                      alt="Student budgeting with notebook"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Photo 2: Top-Right (Coral Pink background) */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-[#FCA5A5] hover:scale-[1.02] transition-transform">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/hero-2.jpg"
                      alt="Happy user saving money"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Photo 3: Bottom-Left (Sunny Yellow background) */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-[#FDE047] hover:scale-[1.02] transition-transform">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/hero-3.jpg"
                      alt="User setting financial goals"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Photo 4: Bottom-Right (Light Sky Blue with bottom-right arch) */}
                  <div className="relative aspect-square rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-[48px] overflow-hidden shadow-lg border-2 border-white bg-[#E0F2FE] hover:scale-[1.02] transition-transform">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/hero-4.jpg"
                      alt="Young professional managing wallet"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VIBRANT COBALT BLUE STAT BANNER */}
      <section className="bg-[#0055FF] text-white py-10 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-blue-400/30">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black tracking-tight">
                Rp 12.4B+
              </div>
              <div className="text-xs sm:text-sm font-bold text-blue-100 mt-1">
                Total Funds Managed
              </div>
            </div>

            <div className="pt-4 md:pt-0 md:pl-8">
              <div className="text-3xl sm:text-4xl font-black tracking-tight">
                120,000+
              </div>
              <div className="text-xs sm:text-sm font-bold text-blue-100 mt-1">
                Expenses Logged
              </div>
            </div>

            <div className="pt-4 md:pt-0 md:pl-8">
              <div className="text-3xl sm:text-4xl font-black tracking-tight">
                98.5%
              </div>
              <div className="text-xs sm:text-sm font-bold text-blue-100 mt-1">
                Budget Accuracy Rate
              </div>
            </div>

            <div className="pt-4 md:pt-0 md:pl-8">
              <div className="text-3xl sm:text-4xl font-black tracking-tight">
                15,000+
              </div>
              <div className="text-xs sm:text-sm font-bold text-blue-100 mt-1">
                Savings Goals Hit
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BENEFITS / WHY CHOOSE US */}
      <section id="benefits" className="py-20 md:py-28 bg-[#F9FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#F59E0B]">
              WHY CHOOSE US
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1E293B] tracking-tight mt-2">
              Benefits of Managing Your Money with Finora
            </h2>
          </div>

          {/* 4 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Blue */}
            <div className="bg-white rounded-2xl p-7 shadow-lg shadow-gray-200/60 border border-gray-100 flex flex-col justify-between hover:-translate-y-1.5 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#2563EB] text-white flex items-center justify-center mb-5 shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Wallet className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-[#1E293B] mb-2.5">
                  1-Click Expense Tracking
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                  Easily record daily income & expenses with instant category tagging and fast search.
                </p>
              </div>
            </div>

            {/* Card 2: Green */}
            <div className="bg-white rounded-2xl p-7 shadow-lg shadow-gray-200/60 border border-gray-100 flex flex-col justify-between hover:-translate-y-1.5 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#10B981] text-white flex items-center justify-center mb-5 shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  <Bell className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-[#1E293B] mb-2.5">
                  24/7 Smart Budget Alerts
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                  Set monthly spending limits for dining, bills & shopping with real-time warning alerts.
                </p>
              </div>
            </div>

            {/* Card 3: Orange */}
            <div className="bg-white rounded-2xl p-7 shadow-lg shadow-gray-200/60 border border-gray-100 flex flex-col justify-between hover:-translate-y-1.5 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F97316] text-white flex items-center justify-center mb-5 shadow-md shadow-orange-500/20 group-hover:scale-110 transition-transform">
                  <PieChart className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-[#1E293B] mb-2.5">
                  Visual Cashflow Analytics
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                  Interactive monthly breakdowns and cash flow trends to see where every rupiah goes.
                </p>
              </div>
            </div>

            {/* Card 4: Pink */}
            <div className="bg-white rounded-2xl p-7 shadow-lg shadow-gray-200/60 border border-gray-100 flex flex-col justify-between hover:-translate-y-1.5 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#EC4899] text-white flex items-center justify-center mb-5 shadow-md shadow-pink-500/20 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-[#1E293B] mb-2.5">
                  Multi-Wallet & Bank Sync
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                  Manage cash, bank accounts, and e-wallets in one unified, clean overview.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ALTERNATING STORY 1 (Left Image + Right Text) */}
      <section id="budgeting" className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Blue Rounded Photo + Floating Budget Calendar Badge */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md">
                {/* Squiggle Doodle on top-left */}
                <div className="absolute -top-6 -left-6 text-[#2563EB] select-none">
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M2 12C6 6 10 18 14 12C18 6 22 18 26 12C30 6 34 18 38 12" />
                  </svg>
                </div>

                {/* Main Photo Card in Solid Sky Blue */}
                <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#7DD3FC]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/story-1.jpg"
                    alt="Student tracking budget on laptop"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Circular Yellow Calendar Badge */}
                <div className="absolute -bottom-6 -right-4 sm:-right-6 w-28 h-28 rounded-full bg-[#FBBF24] p-3 shadow-xl border-4 border-white flex flex-col items-center justify-center text-[#1E293B] animate-bounce-slow">
                  <Calendar className="w-6 h-6 text-[#1E293B] mb-1" />
                  <span className="text-[10px] font-black uppercase tracking-wider">
                    MONTHLY
                  </span>
                  <span className="text-xs font-black">
                    BUDGET
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Copy */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#F59E0B]">
                CUSTOMIZE WITH YOUR LIFESTYLE
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-[#1E293B] leading-tight tracking-tight">
                Personalized Monthly Budgets on Your Own Schedule
              </h2>

              <p className="text-sm sm:text-base text-[#64748B] font-medium leading-relaxed">
                Our flexible budgeting system allows you to set realistic spending limits for groceries, dining out, utilities, and shopping. Visual progress bars show you exactly what you have left to spend each day so you never overspend.
              </p>

              <div className="pt-2">
                <Link
                  href="/register"
                  className="inline-block px-7 py-3 rounded-full bg-[#FBBF24] hover:bg-[#F59E0B] text-[#1E293B] font-extrabold text-sm tracking-wide shadow-md shadow-amber-500/20 hover:shadow-amber-500/35 hover:-translate-y-0.5 transition-all"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ALTERNATING STORY 2 (Left Text + Right Image) */}
      <section className="py-20 md:py-28 bg-[#F9FAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy */}
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#F59E0B]">
                SAVINGS & GOAL TRACKING
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-[#1E293B] leading-tight tracking-tight">
                Set Clear Financial Goals & Watch Your Savings Grow
              </h2>

              <p className="text-sm sm:text-base text-[#64748B] font-medium leading-relaxed">
                Whether saving for an emergency fund, a new laptop, or a year-end vacation, Finora calculates your monthly savings target and keeps you motivated with milestone badges and automatic progress tracking.
              </p>

              <div className="pt-2">
                <Link
                  href="/register"
                  className="inline-block px-7 py-3 rounded-full bg-[#FBBF24] hover:bg-[#F59E0B] text-[#1E293B] font-extrabold text-sm tracking-wide shadow-md shadow-amber-500/20 hover:shadow-amber-500/35 hover:-translate-y-0.5 transition-all"
                >
                  Get started
                </Link>
              </div>
            </div>

            {/* Right Column: 2 Overlapping Rounded Photos with Doodles */}
            <div className="lg:col-span-6 relative flex justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-sm sm:max-w-md">
                {/* Squiggle Doodle top right */}
                <div className="absolute -top-6 right-6 text-[#2563EB] select-none">
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M2 12C6 6 10 18 14 12C18 6 22 18 26 12C30 6 34 18 38 12" />
                  </svg>
                </div>

                {/* Overlapping Images */}
                <div className="grid grid-cols-12 gap-3 items-center">
                  {/* Card 1: Mint background with student holding blue folder */}
                  <div className="col-span-7 relative aspect-square rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-[#99F6E4]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/story-2.jpg"
                      alt="Student achieving savings goal"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Card 2: Warm yellow card with video call aesthetic */}
                  <div className="col-span-5 relative aspect-square rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-[#FEF08A] flex flex-col justify-end p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/hero-2.jpg"
                      alt="Finora community member"
                      className="w-full h-full object-cover"
                    />
                    {/* Video Call Controls Overlay */}
                    <div className="relative z-10 bg-black/60 backdrop-blur-sm rounded-full py-1 px-2 flex items-center justify-around text-white">
                      <Mic className="w-3 h-3 text-white" />
                      <Video className="w-3 h-3 text-white" />
                      <PhoneOff className="w-3 h-3 text-red-400 fill-red-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CATEGORY QUICK-GRID */}
      <section id="categories" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#F59E0B]">
              TRANSACTION CATEGORIES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1E293B] tracking-tight mt-2">
              Organize Every Transaction in Any Category
            </h2>
          </div>

          {/* 8 Categories Grid (2 rows x 4 cols) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Cat 1 */}
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-gray-100 flex items-center gap-3 transition-all cursor-pointer hover:-translate-y-0.5">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#1E293B]">
                Food & Dining
              </span>
            </div>

            {/* Cat 2 */}
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-gray-100 flex items-center gap-3 transition-all cursor-pointer hover:-translate-y-0.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-[#10B981] flex items-center justify-center shrink-0">
                <Car className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#1E293B]">
                Transportation
              </span>
            </div>

            {/* Cat 3 */}
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-gray-100 flex items-center gap-3 transition-all cursor-pointer hover:-translate-y-0.5">
              <div className="w-9 h-9 rounded-lg bg-purple-100 text-[#8B5CF6] flex items-center justify-center shrink-0">
                <Home className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#1E293B]">
                Housing & Bills
              </span>
            </div>

            {/* Cat 4 */}
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-gray-100 flex items-center gap-3 transition-all cursor-pointer hover:-translate-y-0.5">
              <div className="w-9 h-9 rounded-lg bg-pink-100 text-[#EC4899] flex items-center justify-center shrink-0">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#1E293B]">
                Shopping
              </span>
            </div>

            {/* Cat 5 */}
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-gray-100 flex items-center gap-3 transition-all cursor-pointer hover:-translate-y-0.5">
              <div className="w-9 h-9 rounded-lg bg-orange-100 text-[#F97316] flex items-center justify-center shrink-0">
                <HeartPulse className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#1E293B]">
                Health & Wellness
              </span>
            </div>

            {/* Cat 6 */}
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-gray-100 flex items-center gap-3 transition-all cursor-pointer hover:-translate-y-0.5">
              <div className="w-9 h-9 rounded-lg bg-cyan-100 text-[#06B6D4] flex items-center justify-center shrink-0">
                <Plane className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#1E293B]">
                Travel & Trips
              </span>
            </div>

            {/* Cat 7 */}
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-gray-100 flex items-center gap-3 transition-all cursor-pointer hover:-translate-y-0.5">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-[#D97706] flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#1E293B]">
                Salary & Income
              </span>
            </div>

            {/* Cat 8 */}
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-gray-100 flex items-center gap-3 transition-all cursor-pointer hover:-translate-y-0.5">
              <div className="w-9 h-9 rounded-lg bg-gray-100 text-[#64748B] flex items-center justify-center shrink-0">
                <MoreHorizontal className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#64748B]">
                See all
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS SECTION */}
      <section id="reviews" className="py-20 md:py-28 bg-[#F9FAFC] relative overflow-hidden">
        {/* Floating Doodles */}
        <div className="absolute top-12 left-10 text-[#FBBF24] opacity-50 select-none">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="20,4 36,36 4,36" />
          </svg>
        </div>
        <div className="absolute bottom-10 -left-6 w-24 h-24 rounded-full bg-[#FEF08A] -z-10 opacity-60" />
        <div className="absolute top-1/2 right-8 w-20 h-20 rounded-full bg-[#BAE6FD] -z-10 opacity-50" />
        <div className="absolute bottom-12 right-12 text-[#FBBF24] opacity-60 select-none">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="4" width="24" height="24" rx="4" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Header */}
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#F59E0B]">
            OUR TESTIMONIALS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1E293B] tracking-tight mt-2 mb-12">
            What Our Users Say About Us
          </h2>

          {/* 3 Circular Avatars (Middle one selected) */}
          <div className="flex items-center justify-center gap-4 mb-6">
            {testimonials.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setActiveTestimonial(idx)}
                className={`relative rounded-full overflow-hidden transition-all duration-300 cursor-pointer ${
                  activeTestimonial === idx
                    ? "w-16 h-16 ring-4 ring-[#FBBF24] scale-110 shadow-lg"
                    : "w-12 h-12 opacity-60 hover:opacity-100 scale-95"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Active Author Name & Role */}
          <div className="mb-4">
            <h4 className="text-base font-extrabold text-[#1E293B]">
              {testimonials[activeTestimonial].name}
            </h4>
            <p className="text-xs text-[#64748B] font-medium">
              {testimonials[activeTestimonial].role}
            </p>
          </div>

          {/* 5 Stars */}
          <div className="flex items-center justify-center gap-1 text-[#F59E0B] mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
            ))}
          </div>

          {/* Testimonial Quote with Large Quote Marks */}
          <div className="relative max-w-2xl mx-auto px-8">
            <span className="absolute -top-6 -left-2 text-6xl text-[#E2E8F0] font-serif select-none">
              “
            </span>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-medium italic">
              {testimonials[activeTestimonial].text}
            </p>
            <span className="absolute -bottom-10 -right-2 text-6xl text-[#E2E8F0] font-serif select-none">
              ”
            </span>
          </div>
        </div>
      </section>

      {/* 10. CLEAN FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-bold text-sm">
                <Wallet className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-black tracking-tight text-[#1E293B]">
                Finora
              </span>
              <span className="text-xs text-[#94A3B8] ml-2">
                © {new Date().getFullYear()} Finora. Simple & smart personal finance.
              </span>
            </div>

            <div className="flex items-center gap-6 text-xs font-semibold text-[#64748B]">
              <a href="#home" className="hover:text-[#2563EB]">
                Home
              </a>
              <a href="#benefits" className="hover:text-[#2563EB]">
                Features
              </a>
              <a href="#categories" className="hover:text-[#2563EB]">
                Categories
              </a>
              <Link href="/login" className="hover:text-[#2563EB]">
                Sign In
              </Link>
              <Link href="/register" className="text-[#2563EB] font-bold">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
