import Image from 'next/image';
import salad from '../../../../public/salad1.png';
import salad_other from '../../../../public/salad2.png';
import MenuItem from './menu/MenuItem';
import SectionHeaders from './header/SectionHeaders';

const HomeMenu = () => {
  return (
    <section className="py-4">
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image src={salad} width={109} height={189} alt={'sallad'} />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image src={salad_other} width={107} height={195} alt={'sallad'} />
        </div>
      </div>
      <div className="text-center mb-4">
        <SectionHeaders subHeader={'Check Out'} mainHeader={'Menu'} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </section>
  );
};
export default HomeMenu;
