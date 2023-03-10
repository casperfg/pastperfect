import React, { useContext } from "react";
import "./NavBar.css";
import GridContext from "../../pages/Canvas/Context/GridContext";
import ResizeContext from "../../pages/Canvas/Context/ResizeContext";
import LockContext from "../../pages/Canvas/Context/LockContext";

const NavBar = () => {
	const { grid, setGrid } = useContext(GridContext);
	const { resize, setResize } = useContext(ResizeContext);
	const { lock, setLock } = useContext(LockContext);

	const gridOptions = [10, 20, 30, 40, 50];
	const gridText = grid !== 1 ? `Edit Grid (${grid} x ${grid})` : "Enable Grid";

	const toggleResize = () => {
		setResize((prevResize) => !prevResize);
	};

	const toggleLock = () => {
		setLock((prevLock) => !prevLock);
	};

	const changeGrid = () => {
		const nextGrid =
			gridOptions[(gridOptions.indexOf(grid) + 1) % gridOptions.length];
		setGrid(nextGrid);
	};

	return (
		<nav className="navbar">
			<div className="nav-left">
				<a href="/">Home</a>
				<p>File</p>
				<p onClick={grid !== 1 ? changeGrid : () => setGrid(10)}>{gridText}</p>
				{grid !== 1 && <p onClick={() => setGrid(1)}>Disable Grid</p>}
				<p onClick={toggleResize}>
					{resize ? "Disable Resize" : "Enable Resize"}
				</p>
				<p onClick={toggleLock}>{!lock ? "Lock Canvas" : "Unlock Canvas"}</p>
			</div>
			<div className="nav-right">
				<p className="nav-item-right">{"Oseberg1"}</p>
			</div>
		</nav>
	);
};

export default NavBar;
