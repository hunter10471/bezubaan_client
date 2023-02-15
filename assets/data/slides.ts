import { IOnboardingItem } from '../../interfaces/OnboardingItem.interface';
import images from '../images';

const slides: IOnboardingItem[] = [
  {
    title: 'Looking for a vet?',
    description:
      "We have the most abundant range of veterinary doctors all around Karachi that can cater all your pet's healthcare needs. ",
    image: images.s1,
  },
  {
    title: 'Care for your pets',
    description:
      'Your pets are a very important to us and we love them nothing else then our own. Every pet that registers to Bezubaan becomes a part of our pet family.',
    image: images.s2,
  },
  {
    title: 'What we do at Bezubaan',
    description:
      'Our goal is to provide the best pet healthcare in Karachi and to cater any needs your pet might have so they can keep you and your loved ones happy!',
    image: images.s3,
  },
];

export default slides;
