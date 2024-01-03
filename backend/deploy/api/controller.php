<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

	function optionsCatalogue (Request $request, Response $response, $args) {
	    
	    // Evite que le front demande une confirmation à chaque modification
	    $response = $response->withHeader("Access-Control-Max-Age", 600);
	    
	    return addHeaders ($response);
	}

	function hello(Request $request, Response $response, $args) {
	    $array = [];
	    $array ["nom"] = $args ['name'];
	    $response->getBody()->write(json_encode ($array));
	    return $response;
	}
	
	function  getSearchCalatogue (Request $request, Response $response, $args) {
	    global $entityManager;

        $query = $entityManager->getRepository('Produits')->createQueryBuilder('p');

        if ($request->getQueryParam('name') && $request->getQueryParam('name') != '') {
            $query->where('p.name LIKE :name')
                ->setParameter('name', '%' . $request->getQueryParam('name') . '%');
            $products = $query->getQuery()->getResult();
        } elseif ($request->getQueryParam('name') == '') {
            $products = $entityManager->getRepository('Produits')->findAll();
        }

        $data = [];

        foreach ($products as $product) {
            $data[] = [
                "name" => $product->getName(),
                "price" => $product->getPrice(),
                "description" => $product->getDescription()
            ];
        }

        $response->getBody()->write(json_encode($data));

	    return addHeaders ($response);
	}

	// API Nécessitant un Jwt valide
	function getCatalogue (Request $request, Response $response, $args) {
        global $entityManager;

        $products = $entityManager->getRepository('Produits')->findAll();

	    $data = [];

        foreach ($products as $product) {
            $data[] = [
                "name" => $product->getName(),
                "price" => $product->getPrice(),
                "description" => $product->getDescription()
                ];
        }
	    
	    $response->getBody()->write(json_encode($data));
	    
	    return addHeaders ($response);
	}

	function optionsUtilisateur (Request $request, Response $response, $args) {
	    
	    // Evite que le front demande une confirmation à chaque modification
	    $response = $response->withHeader("Access-Control-Max-Age", 600);
	    
	    return addHeaders ($response);
	}

	// API Nécessitant un Jwt valide
	function getUtilisateur (Request $request, Response $response, $args) {
	    global $entityManager;
	    
	    $payload = getJWTToken($request);
	    $login  = $payload->userid;
	    
	    $utilisateurRepository = $entityManager->getRepository('Utilisateurs');
	    $utilisateur = $utilisateurRepository->findOneBy(array('login' => $login));
	    if ($utilisateur) {
		$data = array('nom' => $utilisateur->getNom(), 'prenom' => $utilisateur->getPrenom());
		$response = addHeaders ($response);
		$response = createJwT ($response);
		$response->getBody()->write(json_encode($data));
	    } else {
		$response = $response->withStatus(404);
	    }

	    return addHeaders ($response);
	}

	// APi d'authentification générant un JWT
	function postLogin (Request $request, Response $response, $args) {   
	    global $entityManager;
	    $err=false;
	    $body = $request->getParsedBody();
	    $login = $body ['login'] ?? "";
	    $pass = $body ['password'] ?? "";

 	    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$login))   {
 		    $err = true;
 	    }
 	    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$pass))  {
 		    $err=true;
 	    }

	    if (!$err) {
		    $utilisateurRepository = $entityManager->getRepository('Utilisateurs');
		    $utilisateur = $utilisateurRepository->findOneBy(array('login' => $login, 'password' => $pass));
		    if ($utilisateur and $login == $utilisateur->getLogin() and $pass == $utilisateur->getPassword()) {
		        $response = addHeaders ($response);
		        $response = createJwT ($response);
		        $data = array('nom' => $utilisateur->getNom(), 'prenom' => $utilisateur->getPrenom());
		        $response->getBody()->write(json_encode($data));
		    } else {
		        $response = $response->withStatus(403);
                $response->getBody()->write(json_encode(["message" => "Identifiant ou mot de passe incorrect."]));
		    }
	    } else {
		    $response = $response->withStatus(500);
            $response->getBody()->write(json_encode(["message" => "Identifiant ou mot de passe non valide"]));
	    }

	    return addHeaders ($response);
	}

