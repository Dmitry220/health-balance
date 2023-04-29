import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import {
  descriptionCreatingChallengeSelector,
  setDescriptionChallenge,
  setDisabledButton
} from '../../Redux/slice/challengeSlice'
import './creating-challenge.scss'
import ReactQuill from 'react-quill'
import { toolbarOptions } from '../../utils/globalConstants'
import { extractContent } from '../../utils/common-functions'

export const CreatingDescriptionChallenge = () => {
  const dispatch = useAppDispatch()
  const description = useAppSelector(descriptionCreatingChallengeSelector)

  const handlerDescription = (text: string) => {
      dispatch(setDescriptionChallenge(text))    
  }

  useEffect(() => {
    if (extractContent(description).length >= 3 && extractContent(description).length <= 180) {
      dispatch(setDisabledButton(false))
    } else {
      dispatch(setDisabledButton(true))
    }
  }, [description])

  return (
    <div className={'creating-description-challenge'}>
      <div className='creating-description-challenge__title main-title'>
        Краткое описание
      </div>
      <ReactQuill
        style={{ marginBottom: 15 }}
        theme="snow"
        placeholder='Описание'
        value={description}
        onChange={handlerDescription}
        modules={{ toolbar: toolbarOptions }}
      />

      <div className='creating-description-challenge__note small-text'>
        {extractContent(description).length}/180
      </div>
    </div>
  )
}
