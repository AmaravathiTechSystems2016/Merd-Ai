"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, ExternalLink, TrendingUp } from "lucide-react";

type PestelCategory =
  | "Political"
  | "Economic"
  | "Social"
  | "Technological"
  | "Environmental"
  | "Legal";

export interface Article {
  id: string;
  title: string;
  summary: string;
  publisher: string;
  publishedAt: string;
  relevanceScore: number;
  topicTags: string[];
  imageSrc: string;
  category: PestelCategory;
}

function getTooltipMessage(score: number): string {
  if (score >= 90) return "Critical relevance — Immediate strategic impact";
  if (score >= 80) return "High relevance — Significant business implications";
  if (score >= 70) return "Moderate relevance — Worth monitoring closely";
  return "Standard relevance — Background awareness";
}

function formatPublishedAt(value: string): string {
  const hourMatch = value.match(/^(\d+)h ago$/i);

  if (hourMatch) {
    const hours = Number(hourMatch[1]);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  return value;
}

function resolveArticleImage(article: Article): string {
  if (!article.imageSrc || article.imageSrc.endsWith(".svg")) {
    return `https://picsum.photos/seed/merd-${article.id}/720/480`;
  }

  return article.imageSrc;
}

function ScoreBadge({
  articleId,
  score,
}: {
  articleId: string;
  score: number;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <motion.div
        className="cursor-default rounded-full border px-2.5 py-1 text-[12px] font-semibold leading-none"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        whileHover={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{
          backgroundColor: "transparent",
          borderColor: "var(--monitor-card-score-border)",
          color: "var(--monitor-card-score-text)",
        }}
      >
        <span className="mr-1 opacity-70">Score</span>
        {score}
      </motion.div>

      <AnimatePresence>
        {visible && (
          <motion.div
            key={`tooltip-${articleId}`}
            className="pointer-events-none absolute bottom-full right-0 z-20 mb-2 w-64 rounded-[12px] px-4 py-3 text-xs shadow-xl"
            style={{
              backgroundColor: "var(--color-text-primary)",
              color: "var(--color-text-inverse)",
            }}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute right-3 h-0 w-0"
              style={{
                top: "100%",
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "6px solid var(--color-text-primary)",
              }}
            />
            <p className="text-[0.75rem] font-bold leading-none">Relevance Score</p>
            <p className="mt-1.5 text-[0.75rem] leading-snug" style={{ opacity: 0.82 }}>
              {getTooltipMessage(score)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type MonitorCardProps = {
  article: Article;
  index: number;
};

export function MonitorCard({ article, index }: MonitorCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  return (
    <motion.article
      ref={cardRef}
      className="group relative cursor-pointer overflow-hidden rounded-[28px] border transition-all duration-300"
      style={{
        backgroundColor: "var(--monitor-panel-bg)",
        borderColor: "var(--monitor-panel-border)",
        boxShadow: "var(--monitor-panel-shadow)",
        backdropFilter: "var(--monitor-panel-backdrop)",
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-14"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--color-surface-inverse) 4%, transparent) 0%, transparent 100%)",
        }}
      />

      <div className="relative flex flex-col gap-6 p-6 sm:grid sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-7 sm:p-7">
        <motion.div
          className="relative h-[208px] w-full shrink-0 overflow-hidden rounded-[24px] bg-[color:var(--color-surface-subtle)] sm:h-[192px] sm:w-full"
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.28 }}
          style={{
            backgroundColor: "var(--monitor-control-bg)",
            boxShadow:
              "inset 0 1px 0 color-mix(in srgb, var(--color-surface-inverse) 14%, transparent)",
            backdropFilter: "var(--monitor-control-backdrop)",
          }}
        >
          <Image
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
            height={176}
            src={resolveArticleImage(article)}
            width={360}
          />
        </motion.div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-2.5 text-[13px] font-medium text-[color:var(--color-text-muted)]">
            <span className="font-semibold tracking-[0.01em] text-[color:var(--color-text-primary)]">
              {article.publisher}
            </span>
            <span className="opacity-45">•</span>
            <span>{formatPublishedAt(article.publishedAt)}</span>
          </div>

          <div className="mt-4">
            <motion.button
              className="w-fit cursor-pointer text-left text-[1.4rem] font-semibold leading-[1.14] tracking-[-0.02em] text-[color:var(--color-text-primary)] transition-colors hover:text-[color:var(--color-accent-primary)] sm:text-[1.68rem]"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              type="button"
            >
              {article.title}
            </motion.button>
          </div>

          <p className="mt-3 max-w-[70ch] text-[15px] leading-8 text-[color:var(--color-text-muted)] sm:text-[16px]">
            {article.summary}
          </p>

          <div className="mt-auto">
            <div className="mt-5 flex flex-wrap gap-2">
              {article.topicTags.map((tag: string) => (
                <motion.span
                  key={tag}
                  className="rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-[0.01em] text-[color:var(--color-text-muted)]"
                  whileHover={{ scale: 1.02 }}
                  style={{
                    borderColor: "var(--color-border-subtle)",
                    backgroundColor:
                      "color-mix(in srgb, var(--color-surface-subtle) 86%, transparent)",
                    boxShadow:
                      "inset 0 1px 0 color-mix(in srgb, var(--color-surface-inverse) 12%, transparent)",
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <div
              className="mt-6 flex flex-col gap-3 border-t pt-5 lg:flex-row lg:items-center lg:justify-between"
              style={{ borderColor: "color-mix(in srgb, var(--color-border-subtle) 84%, transparent)" }}
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <motion.button
                  className="flex items-center gap-1.5 px-1.5 py-1 text-[13px] font-medium bg-transparent border-0 shadow-none transition-all"
                  style={{
                    color: "var(--color-text-muted)",
                  }}
                  whileHover={{
                    scale: 1.02,
                    y: -1,
                    color: "var(--color-text-primary)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "tween", duration: 0.13, ease: "easeOut" }}
                  type="button"
                >
                  <Bookmark size={16} />
                  <span>Save</span>
                </motion.button>

                <motion.button
                  className="flex items-center gap-1.5 px-1.5 py-1 text-[13px] font-medium bg-transparent border-0 shadow-none transition-all"
                  style={{
                    color: "var(--color-text-muted)",
                  }}
                  whileHover={{
                    scale: 1.02,
                    y: -1,
                    color: "var(--color-text-primary)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "tween", duration: 0.13, ease: "easeOut" }}
                  type="button"
                >
                  <ExternalLink size={16} />
                  <span>Open</span>
                </motion.button>

                <motion.button
                  className="flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-all"
                  style={{
                    color: "var(--monitor-card-action-text)",
                    backgroundColor: "var(--monitor-card-action-bg)",
                    borderColor: "var(--monitor-card-action-border)",
                    boxShadow: "0 0 0 1.5px var(--monitor-card-action-border)",
                  }}
                  whileHover={{ scale: 1.02, y: -1, backgroundColor: "var(--monitor-card-action-bg-hover)" }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                >
                  <TrendingUp size={16} />
                  <span>Deep dive</span>
                </motion.button>
              </div>
              <div className="flex justify-end lg:justify-end">
                <ScoreBadge articleId={article.id} score={article.relevanceScore} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
