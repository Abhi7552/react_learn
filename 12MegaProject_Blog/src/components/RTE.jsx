import React from 'react'
import {Editor} from '@tinymce/tinymce-react';
import {Controller} from 'react-hook-form';

// export default function RTE() {
//   return (
//     <div>
//         <Editor
//             initialValue='Default content'
//             init={{
//                 height: 500,
//                 menubar: true,
//                 plugins: [
//                     'advlist autolink lists link image charmap print preview anchor',
//                     'searchreplace visualblocks code fullscreen',
//                     'insertdatetime media table paste code help wordcount'
//                 ],
//                 toolbar:
//                     'undo redo | formatselect | bold italic backcolor | \
//                     alignleft aligncenter alignright alignjustify | \
//                     bullist numlist outdent indent | removeformat | help',
//                 content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
//             }}
//         />
//     </div>
//   )
// }

export default function RTE({name,label,control,defaultValue=""}) {
  return (
    <div className='w-full'>
        {label && <label className='text-sm font-semibold mb-2'>{label}</label>}

        <Controller
            name={name || "content"}
            control={control}
            defaultValue={defaultValue}
            render={({field: {onChange, value}}) => (
                <Editor
                    apiKey='l2pyhdd2x9m9zmcwcyu1m03iugsoprr20tl6mux0f3mihtxo'
                    initialValue={value}
                    onEditorChange={onChange}
                    init={{
                        height: 500,
                        menubar: true,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'print', 'preview', 'anchor',
                            'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'paste', 'help', 'wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | ' +
                            'alignleft aligncenter alignright alignjustify | ' +
                            'bullist numlist outdent indent | removeformat | help',
                        content_style: 'body { direction: ltr !important; unicode-bidi: normal !important; font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            )}
        />
    </div>
  )
}