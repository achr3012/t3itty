'use client'

import { useState } from 'react'
import { useRef } from 'react'
import type { User } from "@prisma/client"
import { addTweet } from '@/lib/actions'
import Avatar from './Avatar'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function updateTextareaHeight(textArea: HTMLTextAreaElement) {
  textArea.style.height = 'auto';
  textArea.style.height = `${textArea.scrollHeight}px`;
}

const AddTweet = ({ user }: { user: User }) => {
  if (user == undefined) {
    return <h1>Please login to add new tweets</h1>
  }

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [disabled, setDisabled] = useState(true);

  const queryClient = useQueryClient()

  const textAreaChangeHandler = () => {
    if (textareaRef.current) {
      updateTextareaHeight(textareaRef.current)
      if (textareaRef.current.value == "") {
        setDisabled(true)
      } else {
        setDisabled(false)
      }
    }
  }

  const { mutate: mutateTweet } = useMutation(addTweet, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets'] })
      if (textareaRef.current) {
        textareaRef.current.value = ""
        updateTextareaHeight(textareaRef.current)
        setDisabled(true)
      }
    }
  })

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    if (disabled) return

    formData.append("userId", user.id)
    mutateTweet(formData)
  }

  return (
    <div className="flex p-3 gap-3 border-b">
      < div >
        <Avatar
          priority
          href={user.id}
          src={user.image || "/avatar.png"}
          alt={user.name || "Profile image"}
        />
      </div >
      <form onSubmit={submitHandler}
        className="flex flex-col flex-grow">
        <textarea
          ref={textareaRef}
          onChange={textAreaChangeHandler}
          name='tweet'
          className='resize-none text-xl outline-none mt-4 overflow-hidden'
          placeholder="What is happening ?!"
          maxLength={191}
        />
        <button type="submit" disabled={disabled}
          className="self-end text-lg bg-blue-500 text-white font-semibold py-1 px-4 rounded-2xl my-4 hover:bg-blue-600 transition-colors disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-blue-500">Tweet</button>
      </form>
    </div >
  )
}

export default AddTweet