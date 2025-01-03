
interface inputProps {
    title: string,
    type: string,
    refer?: any
}

const Input = ({title, type, refer}: inputProps) => {
  return (
    <div>
    <input className="outline-none min-w-80 px-3 py-2 w-[65%] text-base rounded-xl border-2 border-gray-700" type = {type} ref = {refer} placeholder = {title}
    onChange={(e)=> refer.current = e.target.value} />
    </div>
  )
}

export default Input