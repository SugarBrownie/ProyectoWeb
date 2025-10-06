"use client";
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useUser } from '@/app/components/Context';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { SONG_BANK } from '@/data/song';

export default function SignUpPage() {
  const { t } = useTranslation();
  const { Email, SetEmail, Psswd, SetPsswd } = useUser();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = () => {
    if (Psswd.length < 8) {
      alert(t('signup.passwordMinLength'));
      return;
    }
    if (Psswd !== confirmPassword) {
      alert(t('signup.passwordMismatch'));
      return;
    }
    if (!acceptTerms) {
      alert(t('signup.acceptTermsRequired'));
      return;
    }
    
    console.log("Account created with:", { Email, Psswd });
    alert(t('signup.accountCreated'));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-slate-900 to-purple-900">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Form */}
        <div className="w-full max-w-md mx-auto space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-purple-900 rotate-90 ml-0.5"></div>
            </div>
            <span className="text-white text-xl font-semibold">MusicBox</span>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">{t('signup.title')}</h1>
            <p className="text-gray-300 text-sm">{t('signup.subtitle')}</p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-white text-sm mb-2">{t('signup.emailLabel')}</label>
              <input
                type="email"
                value={Email}
                onChange={(e) => SetEmail(e.target.value)}
                placeholder={t('signup.emailPlaceholder')}
                className="w-full px-4 py-3 bg-transparent border-2 border-lime-400 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-lime-300 transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-white text-sm mb-2">{t('signup.passwordLabel')}</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={Psswd}
                  onChange={(e) => SetPsswd(e.target.value)}
                  placeholder={t('signup.passwordPlaceholder')}
                  className="w-full px-4 py-3 bg-transparent border-2 border-lime-400 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-lime-300 transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-white text-sm mb-2">{t('signup.confirmPasswordLabel')}</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t('signup.passwordPlaceholder')}
                  className="w-full px-4 py-3 bg-transparent border-2 border-lime-400 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-lime-300 transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-lime-400 bg-transparent checked:bg-lime-400 focus:outline-none cursor-pointer"
              />
              <label htmlFor="terms" className="text-white text-sm cursor-pointer">
                {t('signup.acceptText')} <span className="text-lime-400">{t('signup.termsOfUse')}</span> {t('signup.and')} <span className="text-lime-400">{t('signup.subscription')}</span>
              </label>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-lime-400 text-purple-900 font-semibold rounded-lg hover:bg-lime-300 transition-colors"
            >
              {t('signup.signUpButton')}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-600"></div>
              <span className="text-gray-400 text-sm">{t('signup.orLoginWith')}</span>
              <div className="flex-1 h-px bg-gray-600"></div>
            </div>

            {/* Already have account */}
            <div className="text-center text-sm text-gray-300">
              {t('signup.alreadyHaveAccount')} <span className="text-lime-400 hover:text-lime-300 cursor-pointer">{t('signup.logIn')}</span>
            </div>
          </div>
        </div>

        {/* Right side - Album covers */}
        <div className="hidden md:block relative h-[500px] w-full">
          {/* Álbum de fondo con blur - The Weeknd */}
          <div className="absolute top-12 right-24 w-72 h-72 rounded-2xl overflow-hidden shadow-2xl transform -rotate-6 opacity-50 blur-sm z-10">
            <Image 
              src={SONG_BANK[1].cover} 
              alt={SONG_BANK[1].album}
              fill
              className="object-cover"
            />
          </div>

          {/* Álbum principal - Ed Sheeran Divide */}
          <div className="absolute top-20 right-12 w-80 h-80 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:scale-105 transition-transform duration-300 z-20 border-4 border-purple-400/30">
            <Image 
              src={SONG_BANK[0].cover} 
              alt={SONG_BANK[0].album}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Capa decorativa de fondo */}
          <div className="absolute top-32 right-32 w-64 h-64 bg-purple-600/20 backdrop-blur-xl rounded-2xl transform rotate-12 z-0"></div>
        </div>
      </div>
    </div>
  );
}