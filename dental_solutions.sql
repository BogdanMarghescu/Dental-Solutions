-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Gazdă: 127.0.0.1
-- Timp de generare: iun. 03, 2021 la 07:08 PM
-- Versiune server: 10.4.18-MariaDB
-- Versiune PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Bază de date: `dental_solutions`
--

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `administrator`
--

CREATE TABLE `administrator` (
  `parola` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `administrator`
--

INSERT INTO `administrator` (`parola`) VALUES
('$2b$10$Z/kWfnl2uWhwdrk4xs5UeeJB/DDzOEcNiU0NNmTe1Z.eRPbr/ij6G');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `programare`
--

CREATE TABLE `programare` (
  `ID` int(11) NOT NULL,
  `ID_Serviciu` int(11) NOT NULL,
  `ID_Utilizator` int(11) NOT NULL,
  `data_programare` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `programare`
--

INSERT INTO `programare` (`ID`, `ID_Serviciu`, `ID_Utilizator`, `data_programare`) VALUES
(1, 9, 2, '2021-02-18 15:00:00'),
(2, 6, 2, '2021-03-05 11:00:00'),
(3, 5, 2, '2021-03-22 09:00:00'),
(4, 6, 2, '2021-05-11 10:00:00'),
(7, 3, 1, '2021-05-05 12:00:00'),
(8, 6, 1, '2021-05-11 15:00:00'),
(9, 9, 1, '2021-05-27 19:00:00'),
(10, 4, 2, '2021-05-26 13:00:00'),
(12, 4, 2, '2021-05-20 13:00:00'),
(13, 5, 2, '2021-06-02 14:00:00');

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `tip_serviciu`
--

CREATE TABLE `tip_serviciu` (
  `ID` int(11) NOT NULL,
  `tip` varchar(100) NOT NULL,
  `pret` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `tip_serviciu`
--

INSERT INTO `tip_serviciu` (`ID`, `tip`, `pret`) VALUES
(1, 'Profilaxie carie dentară', 160),
(2, 'Endodontie', 450),
(3, 'Proteză Dentară', 700),
(4, 'Parodontologie', 500),
(5, 'Implant Dentar', 600),
(6, 'Igienizare', 100),
(7, 'Cosmetică dentară', 350),
(8, 'Albire dentară', 300),
(9, 'Radiologie Dentară', 35);

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `utilizatori`
--

CREATE TABLE `utilizatori` (
  `ID` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `nume` varchar(100) NOT NULL,
  `prenume` varchar(100) NOT NULL,
  `telefon` varchar(11) NOT NULL,
  `parola` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Eliminarea datelor din tabel `utilizatori`
--

INSERT INTO `utilizatori` (`ID`, `email`, `nume`, `prenume`, `telefon`, `parola`) VALUES
(1, 'georgealbulescu@gmail.com', 'Albulescu', 'George', '0755314964', '$2b$10$b3DPOxBpRiuk9XNE.KBb.uJ1IzzZpxMLagBhf.D3ge6KEHuDOerHe'),
(2, 'bogdan.marghescu99@gmail.com', 'Marghescu', 'Bogdan', '0799151041', '$2b$10$G77/FjX3d0r5Z1T9.0livukr0abTDC3l98MR4U/NbJabW5fFNELQy'),
(4, 'popescu.george@gmail.com', 'Popescu', 'George', '0771506781', '$2b$10$4JFh29PbVxdi9MU6a.O2rO20cNt2/BiyU.ZCGlAi.vpZN1n5u7Woi'),
(5, 'adrianvisan@yahoo.com', 'Visan', 'Adrian', '0732167552', '$2b$10$Lr7fDfP.I4G6ULHroDJQj.QG.xCftYxCRkrFWzgBaT7briwFK7Bj6');

--
-- Indexuri pentru tabele eliminate
--

--
-- Indexuri pentru tabele `administrator`
--
ALTER TABLE `administrator`
  ADD UNIQUE KEY `parola` (`parola`);

--
-- Indexuri pentru tabele `programare`
--
ALTER TABLE `programare`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `programare_ibfk_1` (`ID_Serviciu`),
  ADD KEY `programare_ibfk_2` (`ID_Utilizator`);

--
-- Indexuri pentru tabele `tip_serviciu`
--
ALTER TABLE `tip_serviciu`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `unique_serviciu` (`tip`);

--
-- Indexuri pentru tabele `utilizatori`
--
ALTER TABLE `utilizatori`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Email` (`email`);

--
-- AUTO_INCREMENT pentru tabele eliminate
--

--
-- AUTO_INCREMENT pentru tabele `programare`
--
ALTER TABLE `programare`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pentru tabele `tip_serviciu`
--
ALTER TABLE `tip_serviciu`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pentru tabele `utilizatori`
--
ALTER TABLE `utilizatori`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constrângeri pentru tabele eliminate
--

--
-- Constrângeri pentru tabele `programare`
--
ALTER TABLE `programare`
  ADD CONSTRAINT `programare_ibfk_1` FOREIGN KEY (`ID_Serviciu`) REFERENCES `tip_serviciu` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `programare_ibfk_2` FOREIGN KEY (`ID_Utilizator`) REFERENCES `utilizatori` (`ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
