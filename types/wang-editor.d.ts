declare module '@wangeditor/editor-for-vue' {
  const Editor: any
  const Toolbar: any
  // type IEditorConfig = any
}

type WangEditorToolbarKey =
  | 'bold'
  | 'underline'
  | 'italic'
  | 'through'
  | 'code'
  | 'sub'
  | 'sup'
  | 'clearStyle'
  | 'color'
  | 'bgColor'
  | 'fontSize'
  | 'fontFamily'
  | 'indent'
  | 'delIndent'
  | 'justifyLeft'
  | 'justifyRight'
  | 'justifyCenter'
  | 'justifyJustify'
  | 'lineHeight'
  | 'uploadImage'
  | 'insertImage'
  | 'deleteImage'
  | 'editImage'
  | 'viewImageLink'
  | 'imageWidth30'
  | 'imageWidth50'
  | 'imageWidth100'
  | 'divider'
  | 'emotion'
  | 'insertLink'
  | 'editLink'
  | 'unLink'
  | 'viewLink'
  | 'codeBlock'
  | 'blockquote'
  | 'headerSelect'
  | 'header1'
  | 'header2'
  | 'header3'
  | 'header4'
  | 'header5'
  | 'todo'
  | 'redo'
  | 'undo'
  | 'fullScreen'
  | 'enter'
  | 'bulletedList'
  | 'numberedList'
  | 'insertTable'
  | 'deleteTable'
  | 'insertTableRow'
  | 'deleteTableRow'
  | 'insertTableCol'
  | 'deleteTableCol'
  | 'tableHeader'
  | 'tableFullWidth'
  | 'insertVideo'
  | 'uploadVideo'
  | 'editVideoSize'
  | 'codeSelectLang'
