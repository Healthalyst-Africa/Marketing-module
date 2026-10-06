"use client";

import { useId } from "react";
import { ColorSwatch } from "@healthalyst/ui/components/color-swatch";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@healthalyst/ui/components/field";
import {
  RadioGroup,
  RadioGroupItem,
} from "@healthalyst/ui/components/radio-group";

export interface DesignPaletteOption {
  identifier: string;
  name: string;
  description: string;
  colors: readonly { label: string; value: string }[];
}

export function PaletteSelector({
  palettes,
  selectedIdentifier,
  onSelect,
}: {
  palettes: readonly DesignPaletteOption[];
  selectedIdentifier: string;
  onSelect: (identifier: string) => void;
}) {
  const identifierPrefix = useId();
  const headingIdentifier = `${identifierPrefix}-palette-heading`;
  return (
    <FieldSet>
      <FieldLegend id={headingIdentifier}>Colour palette</FieldLegend>
      <FieldDescription>
        Choose a direction to preview throughout the website.
      </FieldDescription>
      <RadioGroup
        aria-labelledby={headingIdentifier}
        value={selectedIdentifier}
        onValueChange={onSelect}
      >
        <FieldGroup className="gap-3">
          {palettes.map((palette) => (
            <FieldLabel
              key={palette.identifier}
              htmlFor={`${identifierPrefix}-${palette.identifier}`}
            >
              <Field
                orientation="horizontal"
                data-checked={palette.identifier === selectedIdentifier}
              >
                <RadioGroupItem
                  id={`${identifierPrefix}-${palette.identifier}`}
                  value={palette.identifier}
                  aria-label={palette.name}
                  aria-describedby={`${identifierPrefix}-${palette.identifier}-description`}
                />
                <FieldContent>
                  <span className="font-medium">{palette.name}</span>
                  <FieldDescription
                    id={`${identifierPrefix}-${palette.identifier}-description`}
                  >
                    {palette.description}
                  </FieldDescription>
                  <span
                    className="flex gap-2 pt-2"
                    aria-label={`${palette.name} colours`}
                  >
                    {palette.colors.slice(0, 4).map((color) => (
                      <ColorSwatch
                        key={color.label}
                        label={color.label}
                        color={color.value}
                        compact
                      />
                    ))}
                  </span>
                </FieldContent>
              </Field>
            </FieldLabel>
          ))}
        </FieldGroup>
      </RadioGroup>
    </FieldSet>
  );
}
