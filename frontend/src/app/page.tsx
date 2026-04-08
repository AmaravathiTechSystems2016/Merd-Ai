import { Panel, Tag, Text } from "@/components/atoms";
import { EmptyState, SectionHeader } from "@/components/modules";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[var(--content-width-page)] flex-1 flex-col gap-[var(--space-10)] px-[var(--space-6)] py-[var(--space-10)] md:px-[var(--space-10)] md:py-[var(--space-12)]">
      <SectionHeader
        eyebrow="Foundation"
        title="MERD AI design system foundation"
        description="Tokens, theming, atoms, and reusable modules are in place and ready for future product screen composition."
        meta="This placeholder exists only to render the shared system instead of the starter template."
        divider
      />

      <div className="grid gap-[var(--space-6)] lg:grid-cols-2">
        <Panel className="flex flex-col gap-[var(--space-4)]" padding="lg">
          <Text size="lg" tone="secondary">
            The shell now uses editorial typography, neutral-led surfaces, calm contrast,
            and semantic tokens across both themes.
          </Text>

          <div className="flex flex-wrap gap-[var(--space-3)]">
            <Tag tone="accent">Light and dark themes</Tag>
            <Tag>Token-driven atoms</Tag>
            <Tag>Reusable modules</Tag>
          </div>
        </Panel>

        <EmptyState
          eyebrow="Next step"
          title="Build screens from shared primitives"
          description="Use atoms for base UI, compose modules for shared analytical patterns, and keep page-level styling focused on layout only."
          tone="subtle"
        />
      </div>
    </main>
  );
}
