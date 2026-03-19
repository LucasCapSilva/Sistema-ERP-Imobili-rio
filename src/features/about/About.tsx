import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Gem, Medal, Handshake, Building2, Mail, Phone, UserRound } from 'lucide-react';

const timeline = [
  {
    year: '2018',
    title: 'Fundação da operação',
    description: 'Nasce a proposta de unificar captação, vendas e pós-venda em uma plataforma imobiliária moderna.',
  },
  {
    year: '2020',
    title: 'Evolução para SaaS',
    description: 'Lançamento da versão cloud com módulos de CRM, contratos e análises financeiras.',
  },
  {
    year: '2023',
    title: 'Expansão nacional',
    description: 'Adoção por redes de imobiliárias em múltiplas regiões, com foco em performance comercial.',
  },
  {
    year: '2026',
    title: 'Plataforma inteligente',
    description: 'Integrações estratégicas e visão orientada por dados para decisões mais rápidas.',
  },
];

const principles = [
  {
    title: 'Missão',
    description: 'Simplificar a gestão imobiliária com tecnologia confiável e foco total em resultado.',
    icon: Target,
  },
  {
    title: 'Visão',
    description: 'Ser referência em transformação digital para imobiliárias na América Latina.',
    icon: Eye,
  },
  {
    title: 'Valores',
    description: 'Transparência, inovação contínua, excelência no atendimento e compromisso com o cliente.',
    icon: Gem,
  },
];

const team = [
  {
    name: 'Mariana Costa',
    role: 'CEO & Estratégia',
    bio: 'Especialista em operações imobiliárias com foco em expansão comercial e experiência do cliente.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Rafael Mendes',
    role: 'CTO',
    bio: 'Lidera arquitetura de produto, performance da plataforma e roadmap de integrações.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Camila Rocha',
    role: 'Head de Sucesso do Cliente',
    bio: 'Atua na evolução contínua de processos e no ganho de produtividade de equipes imobiliárias.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  },
];

const certifications = ['ISO 9001 - Gestão de Qualidade', 'LGPD Ready - Governança e proteção de dados', 'Programa Parceiro PropTech Brasil'];
const partnerships = ['PortalZap', 'VivaReal', 'Rede Crédito Fácil', 'Associação Nacional do Mercado Imobiliário'];

const setMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
  const selector = `${attribute}="${name}"`;
  let tag = document.querySelector(`meta[${selector}]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
};

const AboutPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Sobre | ERP Imobiliário';
    setMetaTag('description', 'Conheça a história, missão e equipe do ERP Imobiliário, referência em tecnologia para o setor.');
    setMetaTag('og:title', 'Sobre | ERP Imobiliário', 'property');
    setMetaTag('og:description', 'Saiba como o ERP Imobiliário conecta inovação, desempenho e confiança para imobiliárias.', 'property');
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">Sobre a empresa</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Tecnologia imobiliária com visão de longo prazo</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
          Unimos expertise imobiliária e engenharia de software para criar uma plataforma robusta, acessível e orientada por resultados.
        </p>
      </section>

      <section aria-labelledby="timeline-title" className="space-y-4">
        <h2 id="timeline-title" className="text-2xl font-bold text-slate-900 dark:text-white">
          Nossa história
        </h2>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <ol className="space-y-6">
            {timeline.map((item, index) => (
              <motion.li
                key={item.year}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.07 }}
                className="grid grid-cols-[auto_1fr] gap-4"
              >
                <div className="flex flex-col items-center">
                  <span className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-bold text-white">{item.year}</span>
                  {index < timeline.length - 1 && <span className="mt-2 h-full w-px bg-slate-200 dark:bg-slate-700" />}
                </div>
                <div className="pb-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="principios-title" className="space-y-4">
        <h2 id="principios-title" className="text-2xl font-bold text-slate-900 dark:text-white">
          Missão, visão e valores
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {principles.map((principle, index) => (
            <motion.article
              key={principle.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[var(--color-primary)] dark:bg-slate-800">
                <principle.icon size={20} />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{principle.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{principle.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section aria-labelledby="equipe-title" className="space-y-4">
        <h2 id="equipe-title" className="text-2xl font-bold text-slate-900 dark:text-white">
          Equipe executiva
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {team.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.09 }}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <img
                src={member.image}
                alt={`Foto de ${member.name}`}
                className="h-56 w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white">{member.name}</h3>
                <p className="text-sm text-[var(--color-primary)]">{member.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{member.bio}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section aria-labelledby="certificacoes-title" className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 id="certificacoes-title" className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
            <Medal size={20} className="text-[var(--color-primary)]" />
            Certificações
          </h2>
          <ul className="space-y-2">
            {certifications.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
            <Handshake size={20} className="text-[var(--color-primary)]" />
            Parcerias estratégicas
          </h2>
          <ul className="space-y-2">
            {partnerships.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section aria-labelledby="contato-title" className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <h2 id="contato-title" className="text-2xl font-bold text-slate-900 dark:text-white">
          Fale com nossa equipe
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Envie sua mensagem e retornaremos com uma proposta personalizada para sua operação.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-1">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <Building2 size={16} className="text-[var(--color-primary)]" />
              ERP Imobiliário Brasil
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <Mail size={16} className="text-[var(--color-primary)]" />
              contato@erpimobiliario.com
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <Phone size={16} className="text-[var(--color-primary)]" />
              +55 (11) 4000-1234
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-2" aria-label="Formulário de contato">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="nome" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Nome
                </label>
                <div className="relative">
                  <UserRound size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition-all focus:ring-2 focus:ring-[var(--color-primary)] dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="Seu nome"
                    autoComplete="name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  E-mail
                </label>
                <div className="relative">
                  <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition-all focus:ring-2 focus:ring-[var(--color-primary)] dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="voce@empresa.com"
                    autoComplete="email"
                  />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="mensagem" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Mensagem
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                required
                rows={5}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition-all focus:ring-2 focus:ring-[var(--color-primary)] dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                placeholder="Conte um pouco sobre seu cenário atual..."
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
            >
              Enviar mensagem
            </button>
            {isSubmitted && (
              <p role="status" className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Mensagem enviada com sucesso. Retornaremos em breve.
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
