- Modale connexion
- pages profil
- pages modifier profil
- routes d'accès back
- page ajout de scripts 
- mot de passe perdu 
- rotation de token 
- securation avec les silent refresh 
- Finir la maquette
- optimiser elastic search



OPTIONNEL
- validation des schemas 
- lien dans la page de redirection de confirmation de mail
- modale register change et avec un message et un bouton pour renvoyer un mail
- securisation en split de token 







version: "2"

networks:
  elastic:
    driver: bridge

volumes:
  elasticsearch:
    driver: local

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.15.2
    restart: unless-stopped
    environment:
      - "discovery.type=single-node"
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - "xpack.security.enabled=true"
      - "xpack.security.authc.api_key.enabled=true"
      - "ELASTIC_PASSWORD=Maxlamouette"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - elasticsearch:/usr/share/elasticsearch/data
    ports:
      - 127.0.0.1:9200:9200
    networks:
      - elastic

  ent-search:
    image: docker.elastic.co/enterprise-search/enterprise-search:7.15.2
    restart: unless-stopped
    depends_on:
      - "elasticsearch"
    environment:
      - "JAVA_OPTS=-Xms512m -Xmx512m"
      - "ENT_SEARCH_DEFAULT_PASSWORD=Ciberbob"
      - "elasticsearch.username=elastic"
      - "elasticsearch.password=Maxlamouette"
      - "elasticsearch.host=http://elasticsearch:9200"
      - "allow_es_settings_modification=true"
      - "secret_management.encryption_keys=[4a2cd3f81d39bf28738c10db0ca782095ffac07279561809eecc722e0c20eb09]"
      - "elasticsearch.startup_retry.interval=15"
    ports:
      - 127.0.0.1:3002:3002
    networks:
      - elastic

  kibana:
    image: docker.elastic.co/kibana/kibana:7.15.1
    restart: unless-stopped
    depends_on:
      - "elasticsearch"
      - "ent-search"
    ports:
      - 127.0.0.1:5601:5601
    environment:
      ELASTICSEARCH_HOSTS: http://elasticsearch:9200
      ENTERPRISESEARCH_HOST: http://ent-search:3002
      ELASTICSEARCH_USERNAME: elastic
      ELASTICSEARCH_PASSWORD: changeme
    networks:
      - elastic