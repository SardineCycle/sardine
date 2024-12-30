// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { styled } from '@mui/system';
import type { ReactElement } from 'react';

type Props = {
	cards: {
		taskId: string;
		child: ReactElement;
	}[];
};

export const SwipeablePeriodCardsContainer = ({ cards }: Props) => {
	return (
		<SwiperStyle
			spaceBetween={10}
			slidesPerView={1.2}
			centeredSlides={true}
			onSlideChange={() => console.log('slide change')}
			onSwiper={(swiper) => console.log(swiper)}
		>
			{cards.map(({ taskId, child }) => (
				<SwiperSlideStyle key={taskId}>{child}</SwiperSlideStyle>
			))}
		</SwiperStyle>
	);
};

const SwiperStyle = styled(Swiper)(() => ({}));
const SwiperSlideStyle = styled(SwiperSlide)(() => ({
	paddingBottom: '1rem',
}));
