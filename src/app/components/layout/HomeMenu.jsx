import Image from 'next/image';
import salad from '../../../../public/salad1.png';
import salad_other from '../../../../public/salad2.png';
import MenuItem from './menu/MenuItem';
import SectionHeaders from './header/SectionHeaders';

const HomeMenu = () => {
  return (
    <section className="py-16">
      <div className="text-center mb-4">
        <SectionHeaders subHeader={'Check Out'} mainHeader={'Menu'} />
      </div>
      <div className="grid lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 gap-4 ">
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
