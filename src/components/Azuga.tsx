// import * as React from 'react'
// import { AiFillFastForward } from "react-icons/ai";
// import {IconButton} from "@azuga-bms/azuga-design-system/nexus"
// const Azuga = () => {

//   return (
//     <div>
//         <h2>button from azuga bms</h2>
//         {/* <IconButton icon={<AiFillFastForward/>}></IconButton> */}
//         {/* <IconButton></IconButton> */}
//     </div>
//   )
// }

// export default Azuga
// next-ui-9900/src/components/Azuga.tsx
import * as React from 'react';
import {IconButton, Card} from "@azuga-bms/azuga-design-system/nexus"

import { AiFillFastForward } from "react-icons/ai";

const Azuga: React.FC = () => {
  const data=[12,444,54656,65656,765767,3434,34343]
  return (
    <div>
      <h2>button from azuga bms</h2>
      <IconButton icon={<AiFillFastForward/>}></IconButton>

      {/* <IconButton></IconButton> */}
      {/* <Carousel width={500} height={0} items={data} itemsPerSlide={2} collapseOnDblClick={false}  orientation={'horizontal'} customItems={true}>
        {
          data.map((val)=>{
            return(
              <div>
                {val}
              </div>
            )
          })
        }
      </Carousel> */}
      <Card disabled={false}>
        hello
      </Card>
    </div>
  );
};

export default Azuga;
