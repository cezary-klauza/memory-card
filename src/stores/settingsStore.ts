import { create } from "zustand";

type Illustrations = {
    icon: string,
    title: string,
    list: {
        image: string,
        background: string
    }[]
}

type SettingsState = {
    difficulty: string | undefined,
    illustrations: Illustrations | undefined,
}

type SettingsAction = {
    setDifficulty: (difficulty: SettingsState['difficulty']) => void,
    setIllustrations: (illustration: SettingsState['illustrations']) => void
}

export const useSettingStore = create<SettingsState & SettingsAction>((set) => ({
    difficulty: undefined,
    illustrations: undefined,
    setDifficulty: ( difficulty: string | undefined ) => set({ difficulty: difficulty }),
    setIllustrations: ( illustration: Illustrations | undefined ) => set({ illustrations: illustration })
}))