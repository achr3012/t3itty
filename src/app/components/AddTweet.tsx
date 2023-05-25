'use client'

import { useState, useTransition } from 'react'
import { useRef } from 'react'
import type { User } from "@prisma/client"
import { addTweet } from '@/lib/actions'
import Avatar from './Avatar'
import { useRouter } from 'next/navigation'

function updateTextareaHeight(textArea: HTMLTextAreaElement) {
  textArea.style.height = 'auto';
  textArea.style.height = `${textArea.scrollHeight}px`;
}

const AddTweet = ({ user }: { user: User }) => {
  if (user == undefined) {
    return <h1>Please login to add new tweets</h1>
  }

  const router = useRouter();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isPending, startTransition] = useTransition();

  const [disabled, setDisabled] = useState(true);

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

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    if (!isPending && !disabled) {
      formData.append("userId", user.id)

      startTransition(async () => {
        if (await addTweet(formData)) {
          router.refresh()
          if (textareaRef.current) {
            textareaRef.current.value = ""
            updateTextareaHeight(textareaRef.current)
            setDisabled(true)
          }
        } else {
          alert("semething went wrog maybe your tweet is too BIG")
        }
      })
    }
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