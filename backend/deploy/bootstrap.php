<?php
	use Doctrine\ORM\Tools\Setup;
	use Doctrine\ORM\EntityManager;
	date_default_timezone_set('America/Lima');
	require_once "vendor/autoload.php";
	$isDevMode = true;
	$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
	$conn = array(
	'host' => 'dpg-cm23i3en7f5s73erf9rg-a.oregon-postgres.render.com',

	'driver' => 'pdo_pgsql',
	'user' => 'cnam_db_admin',
	'password' => 'aHWdkGpzixuf8pJiffX25GW05XFbMvhG',
	'dbname' => 'cnam_db_lx8b',
	'port' => '5432'
	);


	$entityManager = EntityManager::create($conn, $config);



