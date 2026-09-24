import React, { useState } from 'react';
import { X, Star, Heart, CheckCircle2, MessageSquare } from 'lucide-react';
import { CustomerReview } from '../types/order';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: CustomerReview) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('Civil Lines, Jhang');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [serviceType, setServiceType] = useState('Dine-In');
  const [favoriteDish, setFavoriteDish] = useState('B.D Special Pizza');
  const [comment, setComment] = useState('');
  const [websiteRating, setWebsiteRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview: CustomerReview = {
      id: `review-${Date.now()}`,
      authorName: name.trim(),
      rating,
      date: 'Just now',
      location: location.trim() || 'Jhang, Pakistan',
      serviceType,
      favoriteDish,
      comment: comment.trim(),
      websiteRating,
      verified: true,
    };

    onSubmitReview(newReview);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setComment('');
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg max-h-[90vh] sm:max-h-[85vh] flex flex-col bg-gradient-to-b from-[#2a1a17] via-[#211412] to-[#1a100f] border border-[#52332c] rounded-2xl sm:rounded-3xl shadow-2xl text-[#f7f2ea] my-auto overflow-hidden">
        {/* Decorative ambient glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        {submitted ? (
          <div className="text-center py-12 px-6 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-serif-luxury text-[#fdfbf7]">
              آپ کا ریویو موصول ہو گیا ہے!
            </h3>
            <p className="text-sm text-[#d4c8ba] max-w-sm mx-auto">
              Thank you for sharing your experience with Bride of Fried Chicken and Pizza (Bright Day) in Civil Lines, Jhang.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            {/* Pinned Modal Header */}
            <div className="flex-shrink-0 px-6 pt-5 pb-3.5 border-b border-[#3d2722] flex items-start justify-between bg-[#291916]/95 backdrop-blur-md">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-semibold uppercase tracking-wider mb-1">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>CUSTOMER REVIEW & FEEDBACK</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-[#fdfbf7]">
                  Share Your Experience
                </h3>
                <p className="text-[11px] text-[#b8ab9d]">
                  Bride of Fried Chicken and Pizza · Civil Lines S.S.P Rd, Jhang
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-2 -mr-1 -mt-1 text-[#b0a294] hover:text-white rounded-xl hover:bg-[#38231f] transition-colors cursor-pointer"
                aria-label="Close review modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body - Smooth Mouse Wheel Scrolling */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 modal-scroll">
              {/* Overall Star Rating */}
              <div className="bg-[#1e1311] p-3.5 rounded-xl border border-[#3d2722]">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#d0c2b2] mb-1.5">
                  Food & Service Rating (کھانے اور سروس کی ریٹنگ)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-2xl transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= (hoverRating || rating)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-[#503a35]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-bold text-amber-400">
                    {rating === 5 ? '5.0 — Outstanding! ⭐' : `${rating}.0 Stars`}
                  </span>
                </div>
              </div>

              {/* Name and Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#cfc1b0] mb-1">
                    Your Name (آپ کا نام) *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Usman Farooq"
                    className="w-full bg-[#1c1110] border border-[#442c26] focus:border-amber-400/70 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#78635c] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#cfc1b0] mb-1">
                    Location / Area in Jhang
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Civil Lines, Jhang"
                    className="w-full bg-[#1c1110] border border-[#442c26] focus:border-amber-400/70 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#78635c] focus:outline-none"
                  />
                </div>
              </div>

              {/* Dining Type & Favorite Dish */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#cfc1b0] mb-1">
                    Experience Type
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-[#1c1110] border border-[#442c26] focus:border-amber-400/70 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  >
                    <option value="Dine-In">Dine-In (ڈائن ان)</option>
                    <option value="Online Order">Online Order (آن لائن آرڈر)</option>
                    <option value="Takeaway">Takeaway (ٹیک اوے)</option>
                    <option value="Family Dinner">Family Gathering (فیملی ڈنر)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#cfc1b0] mb-1">
                    Favorite Dish
                  </label>
                  <input
                    type="text"
                    value={favoriteDish}
                    onChange={(e) => setFavoriteDish(e.target.value)}
                    placeholder="e.g. Kofta Pizza, Chargha"
                    className="w-full bg-[#1c1110] border border-[#442c26] focus:border-amber-400/70 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#78635c] focus:outline-none"
                  />
                </div>
              </div>

              {/* Website Experience Rating */}
              <div className="bg-[#1a1110] p-3 rounded-xl border border-[#39241f] flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#d4c8ba] block">
                    Website Experience (ویب سائٹ کا تجربہ)
                  </span>
                  <span className="text-[11px] text-[#918174]">Design, Ordering & Ease of Use</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setWebsiteRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          star <= websiteRating
                            ? 'text-[#e5383b] fill-[#e5383b]'
                            : 'text-[#4e3630]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment Textarea */}
              <div>
                <label className="block text-xs font-semibold text-[#cfc1b0] mb-1">
                  Your Review & Comments (آپ کی رائے اور فیڈبیک) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about the pizza crust, crispy fried chicken, speed of service, or your thoughts on the website..."
                  className="w-full bg-[#1c1110] border border-[#442c26] focus:border-amber-400/70 rounded-xl p-3 text-sm text-white placeholder-[#78635c] focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Pinned Sticky Footer - Always Visible, Never Cut Off */}
            <div className="flex-shrink-0 px-6 py-3.5 border-t border-[#3e2722] bg-[#1d1210]/95 backdrop-blur-md flex items-center justify-between gap-3">
              <span className="text-[11px] text-[#8c7a6e] hidden sm:inline">
                Scroll with mouse wheel to review fields
              </span>
              <div className="flex items-center gap-2.5 ml-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-[#b5a798] hover:text-white rounded-xl hover:bg-[#2c1b18] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ba181b] to-[#d93829] hover:from-[#a01417] hover:to-[#c12e20] rounded-xl shadow-lg shadow-[#ba181b]/30 transition-all hover:scale-102 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Submit Review / ریویو جمع کروائیں</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
