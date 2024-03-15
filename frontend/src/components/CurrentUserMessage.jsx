import React from 'react'

export default function CurrentUserMessage({currUser, message}) {
    return (
        <div className="flex flex-row-reverse items-start">
            <img className="ml-2 h-8 w-8 rounded-full" src={currUser?.avatarImage} />

            <div className="flex flex-col-reverse min-h-[85px] rounded-b-xl rounded-tl-xl bg-white p-4 pt-2 sm:min-h-0 sm:max-w-md md:max-w-2xl">
                <p> {message} </p>
                <p className="text-sm text-purple-600 text-right">{currUser?.username}</p>
            </div>
        </div>
    )
}
