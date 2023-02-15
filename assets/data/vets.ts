import { IVet } from '../../interfaces/Vet.interface';
import images from '../images';

const vets: IVet[] = [
  {
    name: 'Rajput Hospital',
    image: images.vet1,
    description:
      'One of the leading veterinary hospitals in Karachi with the finest veterinary doctors on call ready for any healthcare needs for your pets.',
    location: 'Karachi',
  },
  {
    name: 'Civil Veterinary',
    image: images.vet2,
    description:
      'Hosting the finest and leading veterinary surgeons across Pakistan, Civil veterinary hospital is one of the best animal healthcare center across the country.',
    location: 'Karachi',
  },
  {
    name: 'Animal Care Clinic',
    image: images.vet3,
    description:
      'We provide the best healthcare services for your pets and all their hygenic needs. Come visit us today and book an appointment.',
    location: 'Karachi',
  },
  {
    name: 'Pets Care N Cure',
    image: images.vet4,
    description:
      'Our promise is to serve you and your pet buddies with nothing but utter care and sheer commitment of the best healthcare.',
    location: 'Karachi',
  },
];

export default vets;
