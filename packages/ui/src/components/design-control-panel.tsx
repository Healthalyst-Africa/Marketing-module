"use client";

import { useId, type ReactElement } from "react";
import { Button } from "@healthalyst/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@healthalyst/ui/components/card";
import { ColorSwatch } from "@healthalyst/ui/components/color-swatch";
import {
  DesignPreview,
  type DesignPreviewContent,
} from "@healthalyst/ui/components/design-preview";
import {
  PaletteSelector,
  type DesignPaletteOption,
} from "@healthalyst/ui/components/palette-selector";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@healthalyst/ui/components/field";
import { Input } from "@healthalyst/ui/components/input";
import { Textarea } from "@healthalyst/ui/components/textarea";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@healthalyst/ui/components/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@healthalyst/ui/components/accordion";
import { Separator } from "@healthalyst/ui/components/separator";
import { useThemePreference } from "@healthalyst/ui/components/theme-preference-provider";

export function DesignControlPanel({
  palettes,
  previewContent,
  websiteLink,
}: {
  palettes: readonly DesignPaletteOption[];
  previewContent: DesignPreviewContent;
  websiteLink: ReactElement;
}) {
  const {
    selectedIdentifier,
    defaultIdentifier,
    persistenceAvailable,
    selectPalette,
    resetPalette,
  } = useThemePreference();
  const fieldIdentifier = useId();
  const selectedPalette = palettes.find(
    (palette) => palette.identifier === selectedIdentifier
  );

  return (
    <main className="mx-auto min-h-screen max-w-[1400px] px-5 py-8 text-foreground sm:px-8 sm:py-12 lg:px-12">
      <header className="mb-10 flex flex-col gap-6 border-b pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm text-muted-foreground">
            Experimental design system
          </p>
          <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            Design control panel
          </h1>
          <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
            Explore the website in a different colour palette. This is a
            presentation preference for this browser; the original palette
            remains the public default.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            {websiteLink}
          </Button>
          <Button
            onClick={resetPalette}
            disabled={selectedIdentifier === defaultIdentifier}
          >
            Reset original
          </Button>
        </div>
      </header>

      {!persistenceAvailable && (
        <Alert className="mb-8">
          <AlertTitle>
            <h2>Preference could not be saved</h2>
          </AlertTitle>
          <AlertDescription>
            This palette will work for this visit. Allow preference cookies to
            keep it after a reload.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid items-start gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12">
        <aside aria-label="Palette selection" className="min-w-0">
          <PaletteSelector
            palettes={palettes}
            selectedIdentifier={selectedIdentifier}
            onSelect={selectPalette}
          />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            With preference cookies enabled, your choice carries across the
            website, reloads and other open tabs. Reset removes the saved
            preference. A product designer will make the final design decision.
          </p>
        </aside>

        <div className="grid min-w-0 gap-8">
          <section aria-labelledby="preview-heading" className="grid gap-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="preview-heading" className="text-lg font-medium">
                Website preview
              </h2>
              <p className="text-sm text-muted-foreground">
                {selectedPalette?.name}
              </p>
            </div>
            <DesignPreview content={previewContent} />
          </section>

          <section aria-labelledby="palette-colours-heading">
            <h2
              id="palette-colours-heading"
              className="mb-4 text-lg font-medium"
            >
              Palette colours
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
              {selectedPalette?.colors.map((color) => (
                <ColorSwatch
                  key={color.label}
                  color={color.value}
                  label={color.label}
                />
              ))}
            </div>
          </section>

          <Separator />

          <Card className="rounded-xl shadow-none">
            <CardHeader>
              <CardTitle>
                <h2 className="text-lg font-medium">Shared components</h2>
              </CardTitle>
              <CardDescription>
                These fields demonstrate styling and do not send a message.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <FieldGroup className="gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor={`${fieldIdentifier}-name`}>
                      Name
                    </FieldLabel>
                    <Input
                      id={`${fieldIdentifier}-name`}
                      placeholder="Your name"
                      autoComplete="off"
                    />
                  </Field>
                  <Field data-disabled="true">
                    <FieldLabel htmlFor={`${fieldIdentifier}-disabled`}>
                      Disabled field
                    </FieldLabel>
                    <Input
                      id={`${fieldIdentifier}-disabled`}
                      value="Unavailable in this preview"
                      disabled
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor={`${fieldIdentifier}-message`}>
                    Message
                  </FieldLabel>
                  <Textarea
                    id={`${fieldIdentifier}-message`}
                    placeholder="Try the input and focus styles"
                    className="min-h-24"
                  />
                  <FieldDescription>
                    Sample input stays on this page and is never submitted.
                  </FieldDescription>
                </Field>
              </FieldGroup>
              <div>
                <Button type="button" disabled>
                  Disabled button
                </Button>
              </div>
              <Alert
                variant="destructive"
                role="note"
                aria-label="Example error styling"
              >
                <AlertTitle>
                  <h3>Example error state</h3>
                </AlertTitle>
                <AlertDescription>
                  This shows the shared error styling. No request has been made.
                </AlertDescription>
              </Alert>
              <Accordion type="single" collapsible>
                <AccordionItem value="preview-details" className="border-b-0">
                  <AccordionTrigger>
                    How does the preview work?
                  </AccordionTrigger>
                  <AccordionContent>
                    The palette changes shared colour tokens. Typography, page
                    content and layout stay the same. Use “View website” to see
                    the chosen colours on the marketing pages.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
      <p role="status" aria-live="polite" className="sr-only">
        Selected palette: {selectedPalette?.name}.{" "}
        {selectedIdentifier === defaultIdentifier
          ? "Original palette active."
          : persistenceAvailable
            ? "Preference saved."
            : "Preference could not be saved."}
      </p>
    </main>
  );
}
