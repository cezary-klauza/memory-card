import { create } from "zustand";

type GameState = {
    list: {
        image: string,
        background: string
    } [],
    selected: {
        index: number,
        image: string
    }[],
    matched: string[],
    fails: number,
    time: number,
}

type GameActions = {
    setList: (list: GameState['list']) => void,
    select: (index: number, image: string) => void,
    clear: () => void,
    startTimer: () => void,
    end: () => void
}

export const useGameStore = create<GameState & GameActions>((set) => ({
    list: [],
    selected: [],
    matched: [],
    fails: 0,
    time: 0,

    setList: (list) => {
        const newList = list.concat(list).sort(() => 0.5 - Math.random());

        set({ list: newList })
    },
    select: (index, image) => {
        set((state) => 
            (state.selected.length === 1 ? 
                state.selected[0].image === image ? 
                    { selected: [], matched: [...state.matched, image] } 
                    : { selected: [...state.selected, { index, image }], fails: state.fails + 1}
                : { selected: [{ index, image }]}
        ))
    },
    clear: () => {
        set({ selected: [] })
    },
    startTimer: () => {
        set((state) => ({ time: state.time + 1 }))
    },
    end: () => {
        set({ selected: [], matched: [], list: [], fails: 0, time: 0})
    }
}))
        