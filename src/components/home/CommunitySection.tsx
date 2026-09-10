import { MessageSquare, ArrowRight, Heart } from 'lucide-react';
import { GithubIcon, DiscordIcon, RedditIcon } from '@/components/icons/BrandIcons';

export function CommunitySection() {
  const redditUrl = process.env.NEXT_PUBLIC_FEEDBACK_URL || 'https://reddit.com/r/BAuInteractive';
  const discordUrl = process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/bauinteractive';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/BAu-0/BAu_Interactive';

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="community-title">
      <div className="rounded-3xl bg-gradient-to-b from-surface-card to-surface border border-surface-border p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-arcade-pink mb-3">
            <Heart className="w-3.5 h-3.5 fill-arcade-pink" />
            <span>Desarrollo Abierto e Independiente</span>
          </div>

          <h2 id="community-title" className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
            Tu opinión da forma a nuestros videojuegos
          </h2>

          <p className="text-base text-slate-300 mb-8 leading-relaxed">
            Estamos construyendo este proyecto de cara a la comunidad. Si probaste la beta de Aether Drift y encontraste un bug, sientes que la inercia puede afinarse o tienes una idea para nuevos obstáculos, queremos escucharte en nuestros canales oficiales.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Reddit */}
            <a
              href={redditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-surface border border-surface-border hover:border-orange-500/50 hover:bg-surface-card transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                    Reddit
                  </h3>
                  <p className="text-xs text-slate-400">Hilo de Feedback</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-orange-400 transition-all" />
            </a>

            {/* Discord */}
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-surface border border-surface-border hover:border-indigo-500/50 hover:bg-surface-card transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <DiscordIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    Discord
                  </h3>
                  <p className="text-xs text-slate-400">Comunidad y Chat</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-indigo-300 transition-all" />
            </a>

            {/* GitHub */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-surface border border-surface-border hover:border-slate-400 hover:bg-surface-card transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-200">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-arcade-cyan transition-colors">
                    GitHub
                  </h3>
                  <p className="text-xs text-slate-400">Repositorio Oficial</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-arcade-cyan transition-all" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
