import React from "react";
import { Transformer, Image } from "react-konva";
import useImage from "use-image";
import "./TransformableImage.css";

//TODO Add undo redo (ctrl+z, ctrl+y) functionality
const TransformableImage = ({
	shapeProps,
	isSelected,
	onSelect,
	onChange,
	imageURL,
}) => {
	const shapeRef = React.useRef();
	const trRef = React.useRef();
	const [image] = useImage(imageURL);

	React.useEffect(() => {
		if (isSelected) {
			// we need to attach transformer manually
			trRef.current.nodes([shapeRef.current]);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

	return (
		<>
			<Image
				className="image"
				image={image}
				onClick={onSelect}
				onTap={onSelect}
				ref={shapeRef}
				{...shapeProps}
				draggable
				onDragMove={(e) => {
					//Moves selected image on a grid
					//TODO Make this setting editable for user
					e.target.x(Math.round(e.target.x() / 10) * 10);
					e.target.y(Math.round(e.target.y() / 10) * 10);
				}}
				onDragEnd={(e) => {
					onChange({
						...shapeProps,
						x: e.target.x(),
						y: e.target.y(),
					});
					//Moves selected image on top (z-index)
					e.target.moveToTop();
				}}
				onTransformEnd={(e) => {
					const node = shapeRef.current;
					const scaleX = node.scaleX();
					const scaleY = node.scaleY();

					node.scaleX(1);
					node.scaleY(1);
					onChange({
						...shapeProps,
						x: node.x(),
						y: node.y(),
						// set minimal value
						width: Math.max(5, node.width() * scaleX),
						height: Math.max(node.height() * scaleY),
					});
				}}
				onMouseEnter={(e) => {
					// Adds a pointer cursor when hovering over the image
					const container = e.target.getStage().container();
					container.style.cursor = "pointer";
				}}
				onMouseLeave={(e) => {
					const container = e.target.getStage().container();
					container.style.cursor = "default";
				}}
			/>
			{isSelected && (
				//Adds the konva transformer to the image item
				<Transformer
					ref={trRef}
					boundBoxFunc={(oldBox, newBox) => {
						// limit resize
						if (newBox.width < 5 || newBox.height < 5) {
							return oldBox;
						}
						return newBox;
					}}
				/>
			)}
		</>
	);
};

export default TransformableImage;