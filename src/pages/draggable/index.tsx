import { useDraggable } from '../../hooks/useDraggable'

const Draggable = () => {
  const [target] = useDraggable()
  return (
    <>
      <div
        ref={target}
        style={{ width: 200, height: 200, border: '1px solid red' }}></div>
    </>
  )
}

export default Draggable
