import utilStyles from '../styles/utils.module.css'
import bottomStyles from './standard-layout.module.css'

export default function StandardLayout({ topLeft, topRight, bottom }) {
  return (
    <>
      <div className={utilStyles.horizontal}>
        {topLeft}
        {topRight}
      </div>
      <div className={bottomStyles.bottom}>
        {bottom}
      </div>            
    </>  
  )
}