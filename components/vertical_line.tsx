import indexStyles from '../pages/index.module.css'
import { Image } from '@nextui-org/react';

export default function Vertical_Line() {
    return (
        <div className={indexStyles.vertical_line}>
          
            <div className={indexStyles.line}></div>
            <Image 
              width={100} 
              height={100} 
              containerCss={{
                margin: 0
              }}
              src="/rit_paw.png"
            />
            <div className={indexStyles.line}></div>
          </div>
      
    )
}