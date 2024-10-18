import { create } from "zustand";
import { illustrations } from "../constants";

type Illustrations = {
    icon: string,
    title: string,
    list: {
        image: string,
        background: string
    }[]
}

export type SettingsState = {
    difficulty: string | undefined,
    illustrations: Illustrations | undefined,
}

type SettingsAction = {
    setDifficulty: (difficulty: SettingsState['difficulty']) => void,
    setIllustrations: (name: string) => void,
    clear: () => void
}

export const useSettingStore = create<SettingsState & SettingsAction>((set) => ({
    difficulty: undefined,
    illustrations: undefined,
    setDifficulty: ( difficulty ) => set({ difficulty: difficulty }),
    setIllustrations: ( name ) => {
        const newIllustrations = illustrations.find(item => item.title === name);
        set({ illustrations: newIllustrations });
    },
    clear: () => {
        set({difficulty: undefined, illustrations: undefined})
    }
}))