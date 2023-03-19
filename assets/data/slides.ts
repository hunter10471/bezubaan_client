import { IOnboardingItem } from '../../interfaces/OnboardingItem.interface';
import images from '../images';

const slides: IOnboardingItem[] = [
  {
    title: 'Looking for a vet?',
    description:
      "Our extensive network of veterinary doctors in Karachi ensures that all your pet's healthcare needs are taken care of. ",
    image: images.doctor,
  },
  {
    title: 'Care for your pets',
    description:
      'We cherish your pets like our own and consider them part of our family when they register with Bezubaan.',
    image: images.care,
  },
  {
    title: 'What we do at Bezubaan',
    description:
      'Our aim is top-notch pet healthcare in Karachi, fulfilling your pet\'s needs to keep you and your loved ones content.',
    image: images.what_we_do,
  },
];

export default slides;
