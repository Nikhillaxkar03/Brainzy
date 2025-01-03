import sadEmoji from '../../assets/image.png'

const DefaultEmbed = () => {
  return (
    <div className='h-44 flex gap-4 flex-col justify-center items-center w-full'>
        <img src={sadEmoji} className='w-1/4' alt="Cannot load content" />
        <h1>Content Not Available!</h1>
    </div>
  )
}

export default DefaultEmbed