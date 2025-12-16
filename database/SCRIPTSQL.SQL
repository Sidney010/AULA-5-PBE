CREATE DATABASE db_locadora_filme_ds2T_25_2;
DROP DATABASE IF EXISTS db_locadora_filme_ds2T_25_2;
USE db_locadora_filme_ds2T_25_2;


DROP TRIGGER IF EXISTS trg_quebrar_contraint_deletar_filme_delete;
DROP TRIGGER IF EXISTS trg__atualizar_filme_genero_update;
DROP TRIGGER IF EXISTS trg_quebrar_contraint_deletar_filme_ator_delete;
DROP TRIGGER IF EXISTS trg__atualizar_filme_ator_update;
DROP TABLE IF EXISTS tbl_filme_genero;
DROP TABLE IF EXISTS tbl_filme_ator;
DROP TABLE IF EXISTS tbl_filme_estudio;
DROP TABLE IF EXISTS tbl_filme;
DROP TABLE IF EXISTS tbl_classificacao_etaria;
DROP TABLE IF EXISTS tbl_genero;
DROP TABLE IF EXISTS tbl_ator;
DROP TABLE IF EXISTS tbl_estudio;
DROP TABLE IF EXISTS tbl_nacionalidade;

CREATE TABLE tbl_classificacao_etaria (
	classificacao_etaria_id INT PRIMARY KEY AUTO_INCREMENT,
    faixa_etaria INT NOT NULL UNIQUE,
	sigla VARCHAR(5) NOT NULL UNIQUE,
	descricao VARCHAR(200) NOT NULL,
    detalhes TEXT
);

CREATE TABLE tbl_genero (
	genero_id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(100) NOT NULL UNIQUE,
	descricao TEXT NOT NULL
);

CREATE TABLE tbl_nacionalidade (
    nacionalidade_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    gentilico VARCHAR(100),
    sigla VARCHAR(5) NOT NULL,
    continente VARCHAR(50),
    lingua_oficial VARCHAR(100),
    bandeira_url TEXT,
    moeda VARCHAR(50)
);

CREATE TABLE tbl_estudio (
    estudio_id INT PRIMARY KEY AUTO_INCREMENT,
    nome_fantasia VARCHAR(100) NOT NULL,
    razao_social VARCHAR(200) NOT NULL,
    cnpj VARCHAR(14) NOT NULL UNIQUE,
    logradouro VARCHAR(100) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    complemento VARCHAR(200) NOT NULL,
	email_contato VARCHAR(150),
    telefone VARCHAR(20),
    site_oficial VARCHAR(200)
);

CREATE TABLE tbl_ator (
	ator_id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(100) NOT NULL,
	data_nascimento DATE NOT NULL,
	data_falecimento DATE,
    altura DECIMAL(3,2) NOT NULL,
	conjuge VARCHAR(200) NULL,
    filhos TEXT,
    biografia TEXT
);

CREATE TABLE tbl_filme (
	filme_id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(100) NOT NULL,
	sinopse TEXT,
	data_lancamento DATE,
	duracao TIME NOT NULL,
	orcamento DECIMAL NOT NULL,
	trailer VARCHAR(200),
	capa VARCHAR(200) NOT NULL,
    classificacao_etaria_id INT NOT NULL,
	FOREIGN KEY (classificacao_etaria_id ) REFERENCES tbl_classificacao_etaria(classificacao_etaria_id)
);

CREATE TABLE tbl_filme_genero (
	id			INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    filme_id	INT NOT NULL,
    genero_id   INT NOT NULL,

    CONSTRAINT FK_FILME_FILME_GENERO
    FOREIGN KEY (filme_id)
    REFERENCES tbl_filme(filme_id),

	CONSTRAINT FK_GENERO_FILME_GENERO
    FOREIGN KEY (genero_id)
    REFERENCES tbl_genero(genero_id)
);

CREATE TABLE tbl_filme_ator (
	id			INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    filme_id	INT NOT NULL,
    ator_id     INT NOT NULL,

    CONSTRAINT FK_FILME_FILME_ATOR
    FOREIGN KEY (filme_id)
    REFERENCES tbl_filme(filme_id),

	CONSTRAINT FK_ATOR_FILME_ATOR
    FOREIGN KEY (ator_id)
    REFERENCES tbl_ator(ator_id)
);

CREATE TABLE tbl_filme_estudio (
	id			INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    filme_id	INT NOT NULL,
    estudio_id 	INT NOT NULL,

    CONSTRAINT FK_FILME_FILME_ESTUDIO
    FOREIGN KEY (filme_id)
    REFERENCES tbl_filme(filme_id),

	CONSTRAINT FK_ESTUDIO_FILME_ESTUDIO
    FOREIGN KEY (estudio_id)
    REFERENCES tbl_estudio(estudio_id)
);

-- INSERTS: tbl_classificacao_etaria (IDs 1 a 6)
INSERT INTO tbl_classificacao_etaria (faixa_etaria, sigla, descricao, detalhes)
VALUES
(0, 'L', 'Livre para todos os públicos',
 'Conteúdo apropriado para todas as idades. Pode conter leves cenas de humor ou fantasia.'),
(10, '10+', 'Não recomendado para menores de 10 anos',
 'Pode conter cenas de violência leve, insinuações sexuais ou linguagem inapropriada moderada.'),
(12, '12+', 'Não recomendado para menores de 12 anos',
 'Pode conter violência, conteúdo sexual leve ou consumo moderado de drogas lícitas.'),
(14, '14+', 'Não recomendado para menores de 14 anos',
 'Cenas de violência, insinuações sexuais mais fortes ou temas intensos.'),
(16, '16+', 'Não recomendado para menores de 16 anos',
 'Cenas de violência explícita, drogas e sexualidade mais intensa.'),
(18, '18+', 'Proibido para menores de 18 anos',
 'Conteúdo adulto com cenas de sexo explícito, violência extrema ou drogas ilícitas.');

-- INSERTS: tbl_genero (IDs 1 a 11)
INSERT INTO tbl_genero (nome, descricao)
VALUES
('Ficção Científica', 'Busca explorar o impacto da ciência e da tecnologia (real ou imaginária) na sociedade ou nos indivíduos, muitas vezes ambientado em futuros especulativos ou universos paralelos'),
('Ação', 'Focado em cenas de movimento intenso, combates e perseguições, destacando coragem, força e adrenalina.'),
('Aventura', 'Explora jornadas e descobertas em locais exóticos, com protagonistas em busca de algo maior, seja um tesouro ou autoconhecimento.'),
('Drama', 'Enfatiza o desenvolvimento emocional e moral dos personagens, explorando conflitos pessoais e sociais.'),
('Comédia', 'Tem como objetivo provocar o riso por meio de situações engraçadas, ironias ou sátiras do cotidiano.'),
('Terror', 'Destinado a causar medo, suspense e tensão, explorando o desconhecido, o sobrenatural ou o psicológico.'),
('Romance', 'Focado em relacionamentos amorosos, emoções e dilemas afetivos, comumente explorando temas de paixão e perda.'),
('Fantasia', 'Ambientado em mundos imaginários, com elementos mágicos, criaturas míticas e heróis épicos.'),
('Documentário', 'Baseado em fatos reais, busca retratar a realidade com profundidade, informando e refletindo sobre temas sociais, culturais ou históricos.'),
('Suspense', 'Constrói tensão e mistério, mantendo o espectador intrigado até a revelação final de um segredo ou crime.'),
('Animação', 'Gênero que utiliza técnicas de animação para contar histórias, podendo abranger desde temas infantis até narrativas complexas para adultos.');

-- INSERTS: tbl_nacionalidade (IDs 1 a 5)
INSERT INTO tbl_nacionalidade (nome, gentilico, sigla, continente, lingua_oficial, bandeira_url, moeda)
VALUES
('Brasil', 'Brasileiro', 'BRA', 'América do Sul', 'Português', 'https://flagcdn.com/w320/br.png', 'Real'),
('Estados Unidos', 'Americano', 'USA', 'América do Norte', 'Inglês', 'https://flagcdn.com/w320/us.png', 'Dólar'),
('Reino Unido', 'Britânico', 'GBR', 'Europa', 'Inglês', 'https://flagcdn.com/w320/gb.png', 'Libra esterlina'),
('Japão', 'Japonês', 'JPN', 'Ásia', 'Japonês', 'https://flagcdn.com/w320/jp.png', 'Iene'),
('França', 'Francês', 'FRA', 'Europa', 'Francês', 'https://flagcdn.com/w320/fr.png', 'Euro');

-- INSERTS: tbl_estudio (IDs 1 a 10)
INSERT INTO tbl_estudio (
    nome_fantasia, razao_social, cnpj, logradouro, numero, bairro, cidade,
    estado, pais, cep, complemento, email_contato, telefone, site_oficial
) VALUES
('Blue Sky Studios', 'Blue Sky Studios Entertainment Ltda', '12345678000199',
 '100 Main Street', '200', 'Greenwich', 'Connecticut', 'CT', 'Estados Unidos', '06830-000',
 'Próximo ao parque central', 'contato@blueskystudios.com', '+1 203 555 1111', 'https://www.blueskystudios.com'),
('Pixar Animation Studios', 'Pixar Animation Studios Inc.', '98765432000155',
 '1200 Park Avenue', '500', 'Emeryville', 'Emeryville', 'CA', 'Estados Unidos', '94608-123',
 'Campus principal', 'contato@pixar.com', '+1 510 555 2222', 'https://www.pixar.com'),
('Warner Bros', 'Warner Bros Entertainment Ltda', '10293847000166',
 '4000 Warner Blvd', '4000', 'Burbank', 'Los Angeles', 'CA', 'Estados Unidos', '91522-000',
 'Sede mundial', 'contato@warnerbros.com', '+1 818 555 3333', 'https://www.warnerbros.com'),
('DreamWorks Animation', 'DreamWorks Animation SKG Inc.', '11223344000188',
 '1000 Flower St', '1000', 'Glendale', 'Los Angeles', 'CA', 'Estados Unidos', '91201-000',
 'Estúdio principal', 'info@dreamworks.com', '+1 818 555 4444', 'https://www.dreamworks.com'),
('Studio Ghibli', 'Studio Ghibli Co., Ltd.', '99887766000122',
 '1-4-25 Kajino-cho', '1', 'Koganei', 'Tóquio', 'Tokyo', 'Japão', '184-0002',
 'Próximo ao museu Ghibli', 'info@ghibli.jp', '+81 422 55 1234', 'https://www.ghibli.jp'),
('Toei Animation', 'Toei Animation Co., Ltd.', '88776655000177',
 '2-10-5 Higashi Oizumi', '2', 'Nerima', 'Tóquio', 'Tokyo', 'Japão', '178-8567',
 'Estúdio principal de animação', 'info@toei-anim.co.jp', '+81 3 3978 3181', 'https://www.toei-anim.co.jp'),
('Globo Filmes', 'Globo Comunicações e Participações S.A.', '27896543000120',
 'Rua Lopes Quintas', '303', 'Jardim Botânico', 'Rio de Janeiro', 'RJ', 'Brasil', '22460-010',
 'Próximo aos estúdios Globo', 'contato@globofilmes.com', '+55 21 4002 8922', 'https://globofilmes.globo.com'),
('O2 Filmes', 'O2 Cinema e Produções Ltda', '55667788000111',
 'Av. das Nações Unidas', '14171', 'Vila Gertrudes', 'São Paulo', 'SP', 'Brasil', '04794-000',
 'Torre Sul', 'contato@o2filmes.com', '+55 11 3897 6000', 'https://www.o2filmes.com'),
('Illumination Entertainment', 'Illumination Entertainment LLC', '55443322000144',
 '1800 Broadway Street', '1800', 'Santa Monica', 'Los Angeles', 'CA', 'Estados Unidos', '90404-000',
 'Próximo à Universal Studios', 'info@illumination.com', '+1 310 555 5678', 'https://www.illumination.com'),
('Laika Studios', 'Laika Entertainment LLC', '66554433000177',
 '1400 NW Front Ave', '1400', 'Pearl District', 'Portland', 'OR', 'Estados Unidos', '97209-000',
 'Estúdio de stop motion', 'info@laika.com', '+1 503 555 4444', 'https://www.laika.com');

-- INSERTS: tbl_ator (IDs 1 a 10)
INSERT INTO tbl_ator (nome, data_nascimento, data_falecimento, altura, conjuge, filhos, biografia)
VALUES
('Leonardo DiCaprio', '1974-11-11', NULL, 1.83, NULL, NULL, 'Ator norte-americano conhecido por papéis em filmes como Titanic, A Origem e O Regresso. Ganhou o Oscar de Melhor Ator em 2016.'),
('Scarlett Johansson', '1984-11-22', NULL, 1.60, 'Colin Jost', 'Rose Dorothy Dauriac, Cosmo Jost', 'Atriz e cantora norte-americana, famosa por interpretar a Viúva Negra no Universo Marvel.'),
('Morgan Freeman', '1937-06-01', NULL, 1.88, 'Myrna Colley-Lee (divorciado)', '4 filhos', 'Ator e narrador americano, conhecido por sua voz marcante e papéis em filmes como Um Sonho de Liberdade e Seven.'),
('Emma Watson', '1990-04-15', NULL, 1.65, NULL, NULL, 'Atriz britânica reconhecida por interpretar Hermione Granger na série Harry Potter e por seu ativismo feminista.'),
('Robert Downey Jr.', '1965-04-04', NULL, 1.74, 'Susan Downey', 'Indio Falconer Downey, Exton Elias Downey, Avri Roel Downey', 'Ator norte-americano que alcançou fama mundial como Tony Stark/Homem de Ferro no Universo Cinematográfico da Marvel.'),
('Tom Hanks', '1956-07-09', NULL, 1.83, 'Rita Wilson', 'Colin Hanks, Elizabeth Hanks, Chet Hanks, Truman Hanks', 'Ator e cineasta americano, conhecido por Forrest Gump, Náufrago e O Resgate do Soldado Ryan.'),
('Natalie Portman', '1981-06-09', NULL, 1.60, 'Benjamin Millepied', 'Aleph Millepied, Amalia Millepied', 'Atriz israelense-americana vencedora do Oscar por Cisne Negro e conhecida também por V de Vingança e Star Wars.'),
('Heath Ledger', '1979-04-04', '2008-01-22', 1.85, 'Michelle Williams (ex-companheira)', 'Matilda Ledger', 'Ator australiano que se destacou por papéis intensos, especialmente como Coringa em O Cavaleiro das Trevas, pelo qual recebeu um Oscar póstumo.'),
('Angelina Jolie', '1975-06-04', NULL, 1.69, 'Brad Pitt (divorciada)', '6 filhos', 'Atriz, diretora e ativista humanitária americana, conhecida por Sr. & Sra. Smith e Malévola.'),
('Keanu Reeves', '1964-09-02', NULL, 1.86, NULL, NULL, 'Ator canadense conhecido por Matrix e John Wick, admirado por sua humildade e discrição.');

-- INSERTS: tbl_filme (IDs 1 a 11). Usando classificacao_etaria_id = 1 (Livre) para compatibilidade.
INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa, classificacao_etaria_id)
VALUES ('Era do Gelo', 'Fim da era glacial', '2002-03-22','01:21:01', 59000000.00 ,'https://www.youtube.com/watch?v=wuYXN78XTHA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTelshMB2Q7U87Nd7N1qZGSQEf6iam9J8NWuEBTYRlcphwX8UDMVbklQdUqfEDdq2SjEz_sQDNJ1_IkS_Xmzm81-847OBPMvBNYAvKKkk4M-w', 1);

INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa, classificacao_etaria_id)
VALUES ('Era do Gelo 2', 'O aquecimento global traz ameaças de inundações generalizadas a regiões que antes eram geladas. Manny, Sid e Diego partem em busca de um refúgio seguro. ', '2006-03-31','01:31:01', 80000000.00 ,'https://www.youtube.com/watch?v=SC4PXMMjPiY', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ7lS4X4Oy50lTAqXT-bF859EYrnsSatpMuaS_rn-I7TAtd6K4r2uZfXtYX-U-t1A32qo6xKYSXY-dqTEMa7NffyD5n6-GNbj6UCJCwdjQiEA', 1);

INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa, classificacao_etaria_id)
VALUES ('Shrek', 'Um ogro chamado Shrek embarca em uma jornada para resgatar a princesa Fiona e recuperar a posse de seu pântano, com a ajuda de um falante burro.',
'2001-05-18', '01:30:00', 60000000.00,
'https://www.youtube.com/watch?v=CwXOrWvPBPk',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1HD0j8zq1F3RM7rl1BZqRMV9lM4t526tvEQ&s', 1);

INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa, classificacao_etaria_id)
VALUES ('Toy Story', 'Woody, o brinquedo favorito de Andy, sente-se ameaçado com a chegada do moderno boneco Buzz Lightyear, que acredita ser um verdadeiro patrulheiro espacial.',
'1995-11-22', '01:21:00', 30000000.00,
'https://www.youtube.com/watch?v=rNk1Wi8SvNc',
'https://br.web.img3.acsta.net/medias/nmedia/18/91/05/36/20127436.jpg', 1);

INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa, classificacao_etaria_id)
VALUES ('Procurando Nemo', 'Quando seu filho Nemo é capturado por um mergulhador, Marlin parte em uma perigosa jornada pelos oceanos ao lado da esquecida Dory para resgatá-lo.',
'2003-05-30', '01:40:00', 94000000.00,
'https://www.youtube.com/watch?v=SPHfeNgogVs',
'https://www.papodecinema.com.br/wp-content/uploads/2012/10/20190604-poster-banner-grande-procurando-nemo-frete-gratis-453455-d_nq_np_690901-mlb27145451767_042018-f.webp', 1);

INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa, classificacao_etaria_id)
VALUES ('Os Incríveis', 'Uma família de super-heróis tenta levar uma vida normal, mas precisa voltar à ação para salvar o mundo de um novo vilão.',
'2004-11-05', '01:55:00', 92000000.00,
'https://www.youtube.com/watch?v=-UaGUdNJdRQ',
'https://www.aabbportoalegre.com.br/intranet/modulos/biblioteca/imgs/2526.jpg', 1);

INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa, classificacao_etaria_id)
VALUES ('Madagascar', 'Quatro animais do zoológico de Nova York acidentalmente vão parar na ilha de Madagascar e precisam aprender a sobreviver na natureza selvagem.',
'2005-05-27', '01:26:00', 75000000.00,
'https://www.youtube.com/watch?v=fq5zU9T_Hl4',
'https://br.web.img2.acsta.net/medias/nmedia/18/91/54/02/20150796.jpg', 1);

INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa, classificacao_etaria_id)
VALUES ('Up - Altas Aventuras', 'Um idoso rabugento e um escoteiro viajam para a América do Sul em uma casa voadora levantada por balões, vivendo uma jornada inesquecível.',
'2009-05-29', '01:36:00', 175000000.00,
'https://www.youtube.com/watch?v=ORFWdXl_zJ4',
'https://br.web.img3.acsta.net/medias/nmedia/18/92/03/73/20176438.jpg', 1);

INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa, classificacao_etaria_id)
VALUES ('Meu Malvado Favorito', 'Um vilão chamado Gru planeja roubar a Lua, mas sua vida muda quando ele adota três meninas órfãs que o ensinam o verdadeiro sentido de amor.',
'2010-07-09', '01:35:00', 69000000.00,
'https://www.youtube.com/watch?v=zzCZ1W_CUoI',
'https://m.media-amazon.com/images/S/pv-target-images/c60fd3cb5bee84a2a2859239761c80656d029c9154e21e07774b6224f0ffe075.jpg', 1);

INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa, classificacao_etaria_id)
VALUES ('Detona Ralph', 'Ralph, o vilão de um jogo de fliperama, sonha em ser um herói e embarca em uma jornada pelos jogos de arcade para provar seu valor.',
'2012-11-02', '01:41:00', 165000000.00,
'https://www.youtube.com/watch?v=87E6N7ToCxs',
'https://mutantexis.wordpress.com/wp-content/uploads/2012/12/blog-detona-ralph-posterl1.jpg', 1);

INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa, classificacao_etaria_id)
VALUES ('Frozen: Uma Aventura Congelante', 'A destemida Anna parte em uma jornada com um alpinista e um boneco de neve para encontrar sua irmã Elsa e acabar com o inverno eterno.',
'2013-11-27', '01:42:00', 150000000.00,
'https://www.youtube.com/watch?v=TbQm5doF_Uc',
'https://br.web.img2.acsta.net/pictures/210/461/21046189_20131002174340886.jpg', 1);

-- INSERTS: tbl_filme_ator (Relações entre Filmes e Atores)
INSERT INTO tbl_filme_ator (filme_id, ator_id) VALUES
-- Era do Gelo (Filme ID 1, Morgan Freeman - ID 3)
(1, 3),

-- Era do Gelo 2 (Filme ID 2, Morgan Freeman - ID 3)
(2, 3),

-- Shrek (Filme ID 3, Angelina Jolie - ID 9)
(3, 9),

-- Toy Story (Filme ID 4, Tom Hanks - ID 6)
(4, 6),

-- Procurando Nemo (Filme ID 5, Tom Hanks - ID 6)
(5, 6),

-- Os Incríveis (Filme ID 6, Robert Downey Jr. - ID 5, Scarlett Johansson - ID 2)
(6, 5),
(6, 2),

-- Madagascar (Filme ID 7, Morgan Freeman - ID 3)
(7, 3),

-- Up - Altas Aventuras (Filme ID 8, Tom Hanks - ID 6)
(8, 6),

-- Meu Malvado Favorito (Filme ID 9, Robert Downey Jr. - ID 5)
(9, 5),

-- Detona Ralph (Filme ID 10, Robert Downey Jr. - ID 5, Scarlett Johansson - ID 2)
(10, 5),
(10, 2),

-- Frozen: Uma Aventura Congelante (Filme ID 11, Emma Watson - ID 4, Natalie Portman - ID 7)
(11, 4),
(11, 7);


-- Trigger que deleta um filme, e tambem exlui ele na tabela relacionamento tbl_filme_genero
DELIMITER $$
CREATE TRIGGER trg_quebrar_contraint_deletar_filme_delete
BEFORE DELETE ON tbl_filme
FOR EACH ROW
BEGIN
	DELETE FROM tbl_filme_genero WHERE filme_id = OLD.filme_id;
END $$
DELIMITER ;


-- Trigger que atualiza um filmeGenero, e tambem conforme a atualização na tabela filme
DELIMITER $$
CREATE TRIGGER trg__atualizar_filme_genero_update
BEFORE UPDATE ON tbl_filme
FOR EACH ROW
BEGIN
	DELETE FROM tbl_filme_genero WHERE filme_id = OLD.filme_id;
END $$
DELIMITER ;


-- Trigger que deleta um filme, e tambem exlui ele na tabela relacionamento tbl_filme_ator
DELIMITER $$
CREATE TRIGGER trg_quebrar_contraint_deletar_filme_ator_delete
BEFORE DELETE ON tbl_filme
FOR EACH ROW
BEGIN
	DELETE FROM tbl_filme_ator WHERE filme_id = OLD.filme_id;
END $$
DELIMITER ;


-- Trigger que atualiza um filmeAtor, e tambem conforme a atualização na tabela filme
DELIMITER $$
CREATE TRIGGER trg__atualizar_filme_ator_update
BEFORE UPDATE ON tbl_filme
FOR EACH ROW
BEGIN
	DELETE FROM tbl_filme_ator WHERE filme_id = OLD.filme_id;
END $$
DELIMITER ;

-- Trigger que deleta um filme, e tambem exlui ele na tabela relacionamento tbl_filme_estudio
DELIMITER $$
CREATE TRIGGER trg_quebrar_contraint_deletar_filme_estudio_delete
BEFORE DELETE ON tbl_filme
FOR EACH ROW
BEGIN
	DELETE FROM tbl_filme_estudio WHERE filme_id = OLD.filme_id;
END $$
DELIMITER ;


-- Trigger que atualiza um filmeEstudio, e tambem conforme a atualização na tabela filme
DELIMITER $$
CREATE TRIGGER trg__atualizar_filme_estudio_update
BEFORE UPDATE ON tbl_filme
FOR EACH ROW
BEGIN
	DELETE FROM tbl_filme_estudio WHERE filme_id = OLD.filme_id;
END $$
DELIMITER ;
