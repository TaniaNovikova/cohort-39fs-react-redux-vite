import { v4 } from "uuid"
import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "store/hooks"
import {
  catFactSelectors,
  catFactsActions,
} from "store/redux/catFact/catFactSlice"
import { CatFact } from "store/redux/catFact/types"

import Button from "components/Button/Button"

import {
  PageWrapper,
  CatFactCard,
  CatFactsContainer,
  CatFactText,
  CatFactWrapper,
  ButtonControl,
} from "./styles"

function Lesson_18() {
  const dispatch = useAppDispatch()
  const catFacts = useAppSelector(catFactSelectors.catFacts)
  const error = useAppSelector(catFactSelectors.error)

  const getCatFact = () => {
    dispatch(catFactsActions.getCatFact("Some fake data"))
  }

  const catFactsParagraphs = catFacts.map((catFact: CatFact, index: number) => {
    return (
      <CatFactWrapper key={v4()}>
        <CatFactText>
          {`${index + 1}.`}
          {catFact.fact}
        </CatFactText>
        <ButtonControl>
          <Button
            isRed
            name="Delete"
            onClick={() => {
              dispatch(catFactsActions.deleteCatFact(catFact.id))
            }}
          />
        </ButtonControl>
      </CatFactWrapper>
    )
  })

  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])

  return (
    <PageWrapper>
      <CatFactCard>
        <CatFactsContainer>
          {catFacts.length > 0 && catFactsParagraphs}
        </CatFactsContainer>
        <Button name="Get Cat Fact" onClick={getCatFact} />
      </CatFactCard>
    </PageWrapper>
  )
}

export default Lesson_18
