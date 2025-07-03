import React from 'react'

function Card(props) {
    return (

        <div class="flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4 ...">
            <img class="mx-auto block h-24 rounded-full sm:mx-0 sm:shrink-0" src="https://images.unsplash.com/photo-1480429370139-e0132c086e2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
            <div class="space-y-2 text-center sm:text-left">
                <div class="space-y-0.5">
                    <p class="text-lg font-semibold text-black">{props.username}</p>
                    <p class="font-medium text-gray-500">{props.designation}</p>
                </div>
                <button class="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ...">
                    Message
                </button>
            </div>
        </div>
    )
}

export default Card;