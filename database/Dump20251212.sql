-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: db_locadora_filme_ds2t_25_2
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_ator`
--

DROP TABLE IF EXISTS `tbl_ator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_ator` (
  `ator_id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `data_nascimento` date NOT NULL,
  `data_falecimento` date DEFAULT NULL,
  `altura` decimal(3,2) NOT NULL,
  `conjuge` varchar(200) DEFAULT NULL,
  `filhos` text,
  `biografia` text,
  PRIMARY KEY (`ator_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_ator`
--

LOCK TABLES `tbl_ator` WRITE;
/*!40000 ALTER TABLE `tbl_ator` DISABLE KEYS */;
INSERT INTO `tbl_ator` VALUES (1,'Leonardo DiCaprio','1974-11-11',NULL,1.83,NULL,NULL,'Ator norte-americano conhecido por papéis em filmes como Titanic, A Origem e O Regresso. Ganhou o Oscar de Melhor Ator em 2016.'),(2,'Scarlett Johansson','1984-11-22',NULL,1.60,'Colin Jost','Rose Dorothy Dauriac, Cosmo Jost','Atriz e cantora norte-americana, famosa por interpretar a Viúva Negra no Universo Marvel.'),(3,'Morgan Freeman','1937-06-01',NULL,1.88,'Myrna Colley-Lee (divorciado)','4 filhos','Ator e narrador americano, conhecido por sua voz marcante e papéis em filmes como Um Sonho de Liberdade e Seven.'),(4,'Emma Watson','1990-04-15',NULL,1.65,NULL,NULL,'Atriz britânica reconhecida por interpretar Hermione Granger na série Harry Potter e por seu ativismo feminista.'),(5,'Robert Downey Jr.','1965-04-04',NULL,1.74,'Susan Downey','Indio Falconer Downey, Exton Elias Downey, Avri Roel Downey','Ator norte-americano que alcançou fama mundial como Tony Stark/Homem de Ferro no Universo Cinematográfico da Marvel.'),(6,'Tom Hanks','1956-07-09',NULL,1.83,'Rita Wilson','Colin Hanks, Elizabeth Hanks, Chet Hanks, Truman Hanks','Ator e cineasta americano, conhecido por Forrest Gump, Náufrago e O Resgate do Soldado Ryan.'),(7,'Natalie Portman','1981-06-09',NULL,1.60,'Benjamin Millepied','Aleph Millepied, Amalia Millepied','Atriz israelense-americana vencedora do Oscar por Cisne Negro e conhecida também por V de Vingança e Star Wars.'),(8,'Heath Ledger','1979-04-04','2008-01-22',1.85,'Michelle Williams (ex-companheira)','Matilda Ledger','Ator australiano que se destacou por papéis intensos, especialmente como Coringa em O Cavaleiro das Trevas, pelo qual recebeu um Oscar póstumo.'),(9,'Angelina Jolie','1975-06-04',NULL,1.69,'Brad Pitt (divorciada)','6 filhos','Atriz, diretora e ativista humanitária americana, conhecida por Sr. & Sra. Smith e Malévola.'),(10,'Keanu Reeves','1964-09-02',NULL,1.86,NULL,NULL,'Ator canadense conhecido por Matrix e John Wick, admirado por sua humildade e discrição.');
/*!40000 ALTER TABLE `tbl_ator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_classificacao_etaria`
--

DROP TABLE IF EXISTS `tbl_classificacao_etaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_classificacao_etaria` (
  `classificacao_etaria_id` int NOT NULL AUTO_INCREMENT,
  `faixa_etaria` int NOT NULL,
  `sigla` varchar(5) NOT NULL,
  `descricao` varchar(200) NOT NULL,
  `detalhes` text,
  PRIMARY KEY (`classificacao_etaria_id`),
  UNIQUE KEY `faixa_etaria` (`faixa_etaria`),
  UNIQUE KEY `sigla` (`sigla`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_classificacao_etaria`
--

LOCK TABLES `tbl_classificacao_etaria` WRITE;
/*!40000 ALTER TABLE `tbl_classificacao_etaria` DISABLE KEYS */;
INSERT INTO `tbl_classificacao_etaria` VALUES (1,0,'L','Livre para todos os públicos','Conteúdo apropriado para todas as idades. Pode conter leves cenas de humor ou fantasia.'),(2,10,'10+','Não recomendado para menores de 10 anos','Pode conter cenas de violência leve, insinuações sexuais ou linguagem inapropriada moderada.'),(3,12,'12+','Não recomendado para menores de 12 anos','Pode conter violência, conteúdo sexual leve ou consumo moderado de drogas lícitas.'),(4,14,'14+','Não recomendado para menores de 14 anos','Cenas de violência, insinuações sexuais mais fortes ou temas intensos.'),(5,16,'16+','Não recomendado para menores de 16 anos','Cenas de violência explícita, drogas e sexualidade mais intensa.'),(6,18,'18+','Proibido para menores de 18 anos','Conteúdo adulto com cenas de sexo explícito, violência extrema ou drogas ilícitas.');
/*!40000 ALTER TABLE `tbl_classificacao_etaria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_estudio`
--

DROP TABLE IF EXISTS `tbl_estudio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_estudio` (
  `estudio_id` int NOT NULL AUTO_INCREMENT,
  `nome_fantasia` varchar(100) NOT NULL,
  `razao_social` varchar(200) NOT NULL,
  `cnpj` varchar(14) NOT NULL,
  `logradouro` varchar(100) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `pais` varchar(100) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `complemento` varchar(200) NOT NULL,
  `email_contato` varchar(150) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `site_oficial` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`estudio_id`),
  UNIQUE KEY `cnpj` (`cnpj`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_estudio`
--

LOCK TABLES `tbl_estudio` WRITE;
/*!40000 ALTER TABLE `tbl_estudio` DISABLE KEYS */;
INSERT INTO `tbl_estudio` VALUES (1,'Blue Sky Studios','Blue Sky Studios Entertainment Ltda','12345678000199','100 Main Street','200','Greenwich','Connecticut','CT','Estados Unidos','06830-000','Próximo ao parque central','contato@blueskystudios.com','+1 203 555 1111','https://www.blueskystudios.com'),(2,'Pixar Animation Studios','Pixar Animation Studios Inc.','98765432000155','1200 Park Avenue','500','Emeryville','Emeryville','CA','Estados Unidos','94608-123','Campus principal','contato@pixar.com','+1 510 555 2222','https://www.pixar.com'),(3,'Warner Bros','Warner Bros Entertainment Ltda','10293847000166','4000 Warner Blvd','4000','Burbank','Los Angeles','CA','Estados Unidos','91522-000','Sede mundial','contato@warnerbros.com','+1 818 555 3333','https://www.warnerbros.com'),(4,'DreamWorks Animation','DreamWorks Animation SKG Inc.','11223344000188','1000 Flower St','1000','Glendale','Los Angeles','CA','Estados Unidos','91201-000','Estúdio principal','info@dreamworks.com','+1 818 555 4444','https://www.dreamworks.com'),(5,'Studio Ghibli','Studio Ghibli Co., Ltd.','99887766000122','1-4-25 Kajino-cho','1','Koganei','Tóquio','Tokyo','Japão','184-0002','Próximo ao museu Ghibli','info@ghibli.jp','+81 422 55 1234','https://www.ghibli.jp'),(6,'Toei Animation','Toei Animation Co., Ltd.','88776655000177','2-10-5 Higashi Oizumi','2','Nerima','Tóquio','Tokyo','Japão','178-8567','Estúdio principal de animação','info@toei-anim.co.jp','+81 3 3978 3181','https://www.toei-anim.co.jp'),(7,'Globo Filmes','Globo Comunicações e Participações S.A.','27896543000120','Rua Lopes Quintas','303','Jardim Botânico','Rio de Janeiro','RJ','Brasil','22460-010','Próximo aos estúdios Globo','contato@globofilmes.com','+55 21 4002 8922','https://globofilmes.globo.com'),(8,'O2 Filmes','O2 Cinema e Produções Ltda','55667788000111','Av. das Nações Unidas','14171','Vila Gertrudes','São Paulo','SP','Brasil','04794-000','Torre Sul','contato@o2filmes.com','+55 11 3897 6000','https://www.o2filmes.com'),(9,'Illumination Entertainment','Illumination Entertainment LLC','55443322000144','1800 Broadway Street','1800','Santa Monica','Los Angeles','CA','Estados Unidos','90404-000','Próximo à Universal Studios','info@illumination.com','+1 310 555 5678','https://www.illumination.com'),(10,'Laika Studios','Laika Entertainment LLC','66554433000177','1400 NW Front Ave','1400','Pearl District','Portland','OR','Estados Unidos','97209-000','Estúdio de stop motion','info@laika.com','+1 503 555 4444','https://www.laika.com');
/*!40000 ALTER TABLE `tbl_estudio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_filme`
--

DROP TABLE IF EXISTS `tbl_filme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_filme` (
  `filme_id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `sinopse` text,
  `data_lancamento` date DEFAULT NULL,
  `duracao` time NOT NULL,
  `orcamento` decimal(10,0) NOT NULL,
  `trailer` varchar(200) DEFAULT NULL,
  `capa` varchar(200) NOT NULL,
  PRIMARY KEY (`filme_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_filme`
--

LOCK TABLES `tbl_filme` WRITE;
/*!40000 ALTER TABLE `tbl_filme` DISABLE KEYS */;
INSERT INTO `tbl_filme` VALUES (1,'Era do Gelo','Fim da era glacial','2002-03-22','01:21:01',59000000,'https://www.youtube.com/watch?v=wuYXN78XTHA','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTelshMB2Q7U87Nd7N1qZGSQEf6iam9J8NWuEBTYRlcphwX8UDMVbklQdUqfEDdq2SjEz_sQDNJ1_IkS_Xmzm81-847OBPMvBNYAvKKkk4M-w'),(2,'Era do Gelo 2','O aquecimento global traz ameaças de inundações generalizadas a regiões que antes eram geladas. Manny, Sid e Diego partem em busca de um refúgio seguro. ','2006-03-31','01:31:01',80000000,'https://www.youtube.com/watch?v=SC4PXMMjPiY','https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ7lS4X4Oy50lTAqXT-bF859EYrnsSatpMuaS_rn-I7TAtd6K4r2uZfXtYX-U-t1A32qo6xKYSXY-dqTEMa7NffyD5n6-GNbj6UCJCwdjQiEA'),(3,'Shrek','Um ogro chamado Shrek embarca em uma jornada para resgatar a princesa Fiona e recuperar a posse de seu pântano, com a ajuda de um falante burro.','2001-05-18','01:30:00',60000000,'https://www.youtube.com/watch?v=CwXOrWvPBPk','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1HD0j8zq1F3RM7rl1BZqRMV9lM4t526tvEQ&s'),(4,'Toy Story','Woody, o brinquedo favorito de Andy, sente-se ameaçado com a chegada do moderno boneco Buzz Lightyear, que acredita ser um verdadeiro patrulheiro espacial.','1995-11-22','01:21:00',30000000,'https://www.youtube.com/watch?v=rNk1Wi8SvNc','https://br.web.img3.acsta.net/medias/nmedia/18/91/05/36/20127436.jpg'),(5,'Procurando Nemo','Quando seu filho Nemo é capturado por um mergulhador, Marlin parte em uma perigosa jornada pelos oceanos ao lado da esquecida Dory para resgatá-lo.','2003-05-30','01:40:00',94000000,'https://www.youtube.com/watch?v=SPHfeNgogVs','https://www.papodecinema.com.br/wp-content/uploads/2012/10/20190604-poster-banner-grande-procurando-nemo-frete-gratis-453455-d_nq_np_690901-mlb27145451767_042018-f.webp'),(6,'Os Incríveis','Uma família de super-heróis tenta levar uma vida normal, mas precisa voltar à ação para salvar o mundo de um novo vilão.','2004-11-05','01:55:00',92000000,'https://www.youtube.com/watch?v=-UaGUdNJdRQ','https://www.aabbportoalegre.com.br/intranet/modulos/biblioteca/imgs/2526.jpg'),(7,'Madagascar','Quatro animais do zoológico de Nova York acidentalmente vão parar na ilha de Madagascar e precisam aprender a sobreviver na natureza selvagem.','2005-05-27','01:26:00',75000000,'https://www.youtube.com/watch?v=fq5zU9T_Hl4','https://br.web.img2.acsta.net/medias/nmedia/18/91/54/02/20150796.jpg'),(8,'Up - Altas Aventuras','Um idoso rabugento e um escoteiro viajam para a América do Sul em uma casa voadora levantada por balões, vivendo uma jornada inesquecível.','2009-05-29','01:36:00',175000000,'https://www.youtube.com/watch?v=ORFWdXl_zJ4','https://br.web.img3.acsta.net/medias/nmedia/18/92/03/73/20176438.jpg'),(9,'Meu Malvado Favorito','Um vilão chamado Gru planeja roubar a Lua, mas sua vida muda quando ele adota três meninas órfãs que o ensinam o verdadeiro sentido de amor.','2010-07-09','01:35:00',69000000,'https://www.youtube.com/watch?v=zzCZ1W_CUoI','https://m.media-amazon.com/images/S/pv-target-images/c60fd3cb5bee84a2a2859239761c80656d029c9154e21e07774b6224f0ffe075.jpg'),(10,'Detona Ralph','Ralph, o vilão de um jogo de fliperama, sonha em ser um herói e embarca em uma jornada pelos jogos de arcade para provar seu valor.','2012-11-02','01:41:00',165000000,'https://www.youtube.com/watch?v=87E6N7ToCxs','https://mutantexis.wordpress.com/wp-content/uploads/2012/12/blog-detona-ralph-posterl1.jpg'),(11,'Frozen: Uma Aventura Congelante','A destemida Anna parte em uma jornada com um alpinista e um boneco de neve para encontrar sua irmã Elsa e acabar com o inverno eterno.','2013-11-27','01:42:00',150000000,'https://www.youtube.com/watch?v=TbQm5doF_Uc','https://br.web.img2.acsta.net/pictures/210/461/21046189_20131002174340886.jpg');
/*!40000 ALTER TABLE `tbl_filme` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg__atualizar_filme_ator_update` BEFORE UPDATE ON `tbl_filme` FOR EACH ROW BEGIN
	DELETE FROM tbl_filme_ator WHERE filme_id = OLD.filme_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_quebrar_contraint_deletar_filme_delete` BEFORE DELETE ON `tbl_filme` FOR EACH ROW BEGIN
	DELETE FROM tbl_filme_genero WHERE filme_id = OLD.filme_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_quebrar_contraint_deletar_filme_ator_delete` BEFORE DELETE ON `tbl_filme` FOR EACH ROW BEGIN
	DELETE FROM tbl_filme_ator WHERE filme_id = OLD.filme_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tbl_filme_ator`
--

DROP TABLE IF EXISTS `tbl_filme_ator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_filme_ator` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filme_id` int NOT NULL,
  `ator_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_FILME_FILME_ATOR` (`filme_id`),
  KEY `FK_ATOR_FILME_ATOR` (`ator_id`),
  CONSTRAINT `FK_ATOR_FILME_ATOR` FOREIGN KEY (`ator_id`) REFERENCES `tbl_ator` (`ator_id`),
  CONSTRAINT `FK_FILME_FILME_ATOR` FOREIGN KEY (`filme_id`) REFERENCES `tbl_filme` (`filme_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_filme_ator`
--

LOCK TABLES `tbl_filme_ator` WRITE;
/*!40000 ALTER TABLE `tbl_filme_ator` DISABLE KEYS */;
INSERT INTO `tbl_filme_ator` VALUES (1,1,3),(2,2,3),(3,3,9),(4,4,6),(5,5,6),(6,6,5),(7,6,2),(8,7,3),(9,8,6),(10,9,5),(11,10,5),(12,10,2),(13,11,4),(14,11,7);
/*!40000 ALTER TABLE `tbl_filme_ator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_filme_genero`
--

DROP TABLE IF EXISTS `tbl_filme_genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_filme_genero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filme_id` int NOT NULL,
  `genero_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_FILME_FILME_GENERO` (`filme_id`),
  KEY `FK_GENERO_FILME_GENERO` (`genero_id`),
  CONSTRAINT `FK_FILME_FILME_GENERO` FOREIGN KEY (`filme_id`) REFERENCES `tbl_filme` (`filme_id`),
  CONSTRAINT `FK_GENERO_FILME_GENERO` FOREIGN KEY (`genero_id`) REFERENCES `tbl_genero` (`genero_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_filme_genero`
--

LOCK TABLES `tbl_filme_genero` WRITE;
/*!40000 ALTER TABLE `tbl_filme_genero` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_filme_genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_genero`
--

DROP TABLE IF EXISTS `tbl_genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_genero` (
  `genero_id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` text NOT NULL,
  PRIMARY KEY (`genero_id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_genero`
--

LOCK TABLES `tbl_genero` WRITE;
/*!40000 ALTER TABLE `tbl_genero` DISABLE KEYS */;
INSERT INTO `tbl_genero` VALUES (1,'Ficção Científica','Busca explorar o impacto da ciência e da tecnologia (real ou imaginária) na sociedade ou nos indivíduos, muitas vezes ambientado em futuros especulativos ou universos paralelos'),(2,'Ação','Focado em cenas de movimento intenso, combates e perseguições, destacando coragem, força e adrenalina.'),(3,'Aventura','Explora jornadas e descobertas em locais exóticos, com protagonistas em busca de algo maior, seja um tesouro ou autoconhecimento.'),(4,'Drama','Enfatiza o desenvolvimento emocional e moral dos personagens, explorando conflitos pessoais e sociais.'),(5,'Comédia','Tem como objetivo provocar o riso por meio de situações engraçadas, ironias ou sátiras do cotidiano.'),(6,'Terror','Destinado a causar medo, suspense e tensão, explorando o desconhecido, o sobrenatural ou o psicológico.'),(7,'Romance','Focado em relacionamentos amorosos, emoções e dilemas afetivos, comumente explorando temas de paixão e perda.'),(8,'Fantasia','Ambientado em mundos imaginários, com elementos mágicos, criaturas míticas e heróis épicos.'),(9,'Documentário','Baseado em fatos reais, busca retratar a realidade com profundidade, informando e refletindo sobre temas sociais, culturais ou históricos.'),(10,'Suspense','Constrói tensão e mistério, mantendo o espectador intrigado até a revelação final de um segredo ou crime.'),(11,'Animação','Gênero que utiliza técnicas de animação para contar histórias, podendo abranger desde temas infantis até narrativas complexas para adultos.');
/*!40000 ALTER TABLE `tbl_genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_nacionalidade`
--

DROP TABLE IF EXISTS `tbl_nacionalidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_nacionalidade` (
  `nacionalidade_id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `gentilico` varchar(100) DEFAULT NULL,
  `sigla` varchar(5) NOT NULL,
  `continente` varchar(50) DEFAULT NULL,
  `lingua_oficial` varchar(100) DEFAULT NULL,
  `bandeira_url` text,
  `moeda` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`nacionalidade_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_nacionalidade`
--

LOCK TABLES `tbl_nacionalidade` WRITE;
/*!40000 ALTER TABLE `tbl_nacionalidade` DISABLE KEYS */;
INSERT INTO `tbl_nacionalidade` VALUES (1,'Brasil','Brasileiro','BRA','América do Sul','Português','https://flagcdn.com/w320/br.png','Real'),(2,'Estados Unidos','Americano','USA','América do Norte','Inglês','https://flagcdn.com/w320/us.png','Dólar'),(3,'Reino Unido','Britânico','GBR','Europa','Inglês','https://flagcdn.com/w320/gb.png','Libra esterlina'),(4,'Japão','Japonês','JPN','Ásia','Japonês','https://flagcdn.com/w320/jp.png','Iene'),(5,'França','Francês','FRA','Europa','Francês','https://flagcdn.com/w320/fr.png','Euro');
/*!40000 ALTER TABLE `tbl_nacionalidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'db_locadora_filme_ds2t_25_2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-12 23:23:46
