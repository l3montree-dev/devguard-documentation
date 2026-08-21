import type { DropzoneState } from 'react-dropzone'

interface Props {
    dropzone: DropzoneState
    files: string[]
    id?: string
}
export default function FileUpload({ dropzone, files, id }: Props) {
    return (
        <div
            id={id}
            className="border-muted-foreground mt-3 border-2 border-dashed group p-1 rounded"
        >
            <div
                {...dropzone.getRootProps()}
                style={{ outline: 'none', boxShadow: 'none' }}
                className="flex h-10 bg-transparent cursor-pointer items-center justify-center rounded"
            >
                <input
                    {...dropzone.getInputProps()}
                    data-testid={
                        id ? `file-upload-input-${id}` : 'file-upload-input'
                    }
                />
                {files.length > 0 ? (
                    <div className="flex flex-col items-center">
                        {files.map((file, index) => (
                            <p key={index} className="text-muted-foreground">
                                {file}
                            </p>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-xs text-center transition-all group-hover:text-primary">
                        Drag and drop some file here, or click to select
                    </p>
                )}
            </div>
        </div>
    )
}
