import React, { useState } from 'react';
import { Star, MessageSquare, Heart, CheckCircle2, ThumbsUp, Filter, Quote, Sparkles } from 'lucide-react';
import { CustomerReview } from '../types/order';
import { BUSINESS_INFO } from '../data/menuData';

interface CustomerReviewsSectionProps {
  reviews: CustomerReview[];
  onOpenReviewModal: () => void;
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({
  reviews,
  onOpenReviewModal,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [helpfulCounts, setHelpfulCounts] = useState<{ [key: string]: number }>({});

  const handleHelpful = (id: string) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const filteredReviews =
    filterType === 'all'
      ? reviews
      : reviews.filter((r) =>
          r.serviceType.toLowerCase().includes(filterType.toLowerCase())
        );

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : '4.9';

  return (
    <section id="reviews-section" className="py-24 bg-gradient-to-b from-[#1c110f] via-[#241512] to-[#1a100e] text-[#f5efe6] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header & Overall Score */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>GUEST REVIEWS & FEEDBACK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-[#fdfbf7] tracking-tight">
              Customer Experiences & Reviews
            </h2>
            <p className="mt-2 text-sm text-[#cbbea9]">
              Real feedback from diners at {BUSINESS_INFO.altName}, Civil Lines S.S.P Rd, Jhang.
            </p>
          </div>

          {/* Review Stats & Action Button */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-[#241512] border border-[#442b24] p-3.5 rounded-2xl flex items-center gap-3 shadow-lg">
              <div className="text-3xl font-black text-amber-400 font-serif-luxury">
                {averageRating}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-[#a99989] font-medium block mt-0.5">
                  Based on {reviews.length + 342} Jhang Diners
                </span>
              </div>
            </div>

            {/* Dedicated Review Button */}
            <button
              onClick={onOpenReviewModal}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#ba181b] to-[#d93829] hover:from-[#a01417] hover:to-[#be281a] text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-[#ba181b]/30 transition-all hover:scale-105 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Write a Review / ریویو دیں</span>
            </button>
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          <span className="text-xs text-[#9c8c7d] flex items-center gap-1 mr-2 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          {[
            { key: 'all', label: 'All Reviews (تمام ریویوز)' },
            { key: 'dine-in', label: 'Dine-In' },
            { key: 'online', label: 'Online Order' },
            { key: 'takeaway', label: 'Takeaway' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterType(tab.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterType === tab.key
                  ? 'bg-amber-500 text-black font-bold shadow-md'
                  : 'bg-[#231512] text-[#bcaea0] hover:text-white border border-[#3d2722]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid with Enhanced Hover Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="group relative bg-gradient-to-b from-[#241714] via-[#1d1210] to-[#160d0c] border border-[#442c26] rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.025] hover:border-amber-400 hover:shadow-[0_24px_50px_-10px_rgba(245,158,11,0.28),0_0_25px_0_rgba(186,24,27,0.2)]"
            >
              {/* Dynamic Top Edge Light Beam on Hover */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Atmospheric Background Ambient Glows */}
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl group-hover:scale-150 group-hover:bg-amber-500/25 transition-all duration-700 pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#ba181b]/10 rounded-full blur-2xl group-hover:scale-125 group-hover:bg-[#ba181b]/20 transition-all duration-700 pointer-events-none" />

              {/* Watermark Quote Icon - Animates on Hover */}
              <div className="absolute top-4 right-4 text-[#35211d]/70 group-hover:text-amber-500/20 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 pointer-events-none">
                <Quote className="w-12 h-12" />
              </div>

              <div className="relative z-10 space-y-3.5">
                {/* Header with stars & date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 transition-all duration-300 ${
                          i < review.rating
                            ? 'text-amber-400 fill-amber-400 group-hover:scale-120 group-hover:text-amber-300 group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]'
                            : 'text-[#48332c]'
                        }`}
                        style={{
                          transitionDelay: `${i * 40}ms`,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#918174] font-medium group-hover:text-amber-300/80 transition-colors">
                    {review.date}
                  </span>
                </div>

                {/* Service Tag & Dish */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-[#331e1a] text-amber-300 border border-[#4c2d26] text-[10px] font-bold uppercase tracking-wider group-hover:bg-[#422520] group-hover:border-amber-500/50 group-hover:text-amber-200 transition-all">
                    {review.serviceType}
                  </span>
                  {review.favoriteDish && (
                    <span className="px-2.5 py-1 rounded-lg bg-[#1a100e] text-[#bcaea0] border border-[#38231e] text-[11px] truncate max-w-[200px] group-hover:border-amber-500/30 group-hover:text-white transition-all">
                      ❤️ {review.favoriteDish}
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#ded3c5] leading-relaxed italic group-hover:text-white transition-colors duration-300 pt-1">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author Footer with Initials Avatar & Glow */}
              <div className="relative z-10 pt-4 mt-5 border-t border-[#34211d] flex items-center justify-between group-hover:border-amber-500/30 transition-colors duration-300">
                <div className="flex items-center gap-3">
                  {/* Initials Avatar */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3d241f] to-[#1c110f] border border-[#5a3830] group-hover:border-amber-400 group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.35)] flex items-center justify-center font-bold text-xs text-amber-300 transition-all duration-300 flex-shrink-0">
                    {review.authorName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white group-hover:text-amber-200 transition-colors">
                        {review.authorName}
                      </span>
                      {review.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-115 transition-transform" />
                      )}
                    </div>
                    <span className="text-[11px] text-[#9c8c7d] block">
                      {review.location}
                    </span>
                  </div>
                </div>

                {/* Helpful button with interactive hover */}
                <button
                  onClick={() => handleHelpful(review.id)}
                  className="flex items-center gap-1.5 text-[11px] text-[#9c8c7d] hover:text-amber-400 group-hover:text-[#cfc1b2] transition-all p-1.5 rounded-lg hover:bg-white/5 active:scale-95 cursor-pointer"
                  title="Mark as helpful"
                >
                  <ThumbsUp className="w-3.5 h-3.5 group-hover:text-amber-400" />
                  <span className="tabular-nums font-semibold">{helpfulCounts[review.id] || 12}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
