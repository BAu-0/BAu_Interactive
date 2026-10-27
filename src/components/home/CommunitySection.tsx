import React from 'react';
import { ArrowRight } from 'lucide-react';
import { DiscordIcon, InstagramIcon, FacebookIcon, TikTokIcon } from '@/components/icons/BrandIcons';

export function CommunitySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" aria-labelledby="community-title">
      <div className="max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-widest text-[#a855f7] mb-2 block font-sans">
          Conéctate con el Estudio
        </span>
        <h2
          id="community-title"
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-sans mb-3"
        >
          Síguenos en redes y comunícate con nosotros
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
          Queremos construir juegos junto a los jugadores. Conéctate a nuestro servidor de Discord para platicar con nosotros, hacernos llegar tus sugerencias o simplemente mantenerte al tanto de los lanzamientos y futuros títulos que estamos preparando en el estudio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Discord - Canal Principal */}
        <a
          href="https://discord.gg/BTNA7EEQG"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-6 rounded-2xl bg-zinc-950 border border-[#a855f7]/50 hover:border-[#a855f7] hover:shadow-xl hover:shadow-purple-950/30 transition-all flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/80 flex items-center justify-center text-[#a855f7] group-hover:scale-105 transition-transform">
              <DiscordIcon className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#a855f7] block mb-1">
                CANAL PRINCIPAL DE FEEDBACK
              </span>
              <h3 className="text-lg font-bold text-white uppercase font-sans">
                Discord Oficial
              </h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Foro de discusión, reporte de bugs, balance de juego y noticias directas del estudio.
            </p>
          </div>
          <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-bold uppercase text-[#a855f7] group-hover:translate-x-0.5 transition-transform">
            <span>Unirse al Discord</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/bau.interactive/"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-all flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:scale-105 transition-all">
              <InstagramIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                RED SOCIAL
              </span>
              <h3 className="text-lg font-bold text-white uppercase font-sans">
                Instagram
              </h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              @bau.interactive — Vistazos de arte, clips de desarrollo y anuncios oficiales.
            </p>
          </div>
          <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-bold uppercase text-zinc-300 group-hover:text-white transition-colors">
            <span>Ver Perfil</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/profile.php?id=61595454786065&locale=es_LA"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-all flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:scale-105 transition-all">
              <FacebookIcon className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                COMUNIDAD
              </span>
              <h3 className="text-lg font-bold text-white uppercase font-sans">
                Facebook
              </h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Página oficial de BAu Interactive para comunicados y actualizaciones de la comunidad.
            </p>
          </div>
          <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-bold uppercase text-zinc-300 group-hover:text-white transition-colors">
            <span>Seguir Página</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </a>

        {/* TikTok */}
        <a
          href="https://www.tiktok.com/@bau_interactive"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-all flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:scale-105 transition-all">
              <TikTokIcon className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                CONTENIDO CORTO
              </span>
              <h3 className="text-lg font-bold text-white uppercase font-sans">
                TikTok
              </h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              @bau_interactive — Jugadas destacadas, dinámicas de cancha y curiosidades de desarrollo.
            </p>
          </div>
          <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-bold uppercase text-zinc-300 group-hover:text-white transition-colors">
            <span>Ver Videos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </a>
      </div>
    </section>
  );
}
