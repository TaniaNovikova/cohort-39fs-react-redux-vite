import axios from "axios"
import { v4 } from "uuid"
import { createAppSlice } from "store/createAppSlice"
import { PayloadAction } from "@reduxjs/toolkit"

import { CatFactSliceState, CatFact } from "./types"

const catFactInitialState: CatFactSliceState = {
  catFacts: [],
  error: undefined,
}

export const catFactSlice = createAppSlice({
  name: "CAT_FACT",
  initialState: catFactInitialState,
  reducers: create => ({
    // asyncThunk - метод у обьекта create, он позволяет работать с асинхронностью в redux
    // принимает в себя 2 аргумента
    // 1.ф-ия callback, которая выполняет асинхронные действия. Например запрос на сервер
    // 2. обхект- в котором содержаться 3 reducers - pending, fulfilled и rejected
    // pending, fulfilled и rejected - вызываются только на дейтвия прописанные в 1 аргументе функции middleware
    getCatFact: create.asyncThunk(
      async (payload: any) => {
        console.log(payload)
        // В response у нас будет лежать либо ошибка, либо нормальные данные, что именно мы не занем сразу
        let response = await axios.get("https://catfact.ninja/fact")
        // response возвращается в action.payload в fulfilled или rejected
        return response
      },
      {
        pending: (state: CatFactSliceState) => {
          state.error = undefined
          console.log("Pending")
        },
        fulfilled: (state: CatFactSliceState, action) => {
          state.catFacts = [
            ...state.catFacts,
            { fact: action.payload.data.fact, id: v4() },
          ]
          console.log("Fulfilled", action)
        },
        rejected: (state: CatFactSliceState, action) => {
          state.error = action.error.message
          console.log("rejected", action)
        },
      },
    ),
    deleteCatFact: create.reducer(
      (state: CatFactSliceState, action: PayloadAction<string>) => {
        console.log(action)
        state.catFacts = state.catFacts.filter((catFact: CatFact) => {
          return catFact.id !== action.payload
        })
      },
    ),
  }),
  selectors: {
    catFacts: (state: CatFactSliceState) => state.catFacts,
    error: (state: CatFactSliceState) => state.error,
  },
})

export const catFactsActions = catFactSlice.actions

export const catFactSelectors = catFactSlice.selectors
