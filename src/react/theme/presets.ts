export const accentPresets = {
  amber:      ['#F2A03C', '#C77A1F', '#FBE6C8'] as [string, string, string],
  terracotta: ['#D4694A', '#A84328', '#F5DDD5'] as [string, string, string],
  sage:       ['#5A9A5F', '#3D7042', '#DFF0DF'] as [string, string, string],
  indigo:     ['#5B6FD4', '#3A4FB8', '#DDE2F5'] as [string, string, string],
  plum:       ['#8B5CA8', '#6A3D87', '#EDE0F5'] as [string, string, string],
} as const;

export type AccentPresetName = keyof typeof accentPresets;
export type AccentTuple = [string, string, string];
