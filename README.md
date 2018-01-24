Pingpong game with BPM
============

Jogo de pingpong com a velocidade baseada no BPM do jogador.


- Foi utilizado uma [placa com sensor PPG](http://embedded-lab.com/blog/introducing-easy-pulse-a-diy-photoplethysmographic-sensor-for-measuring-heart-rate/)
 para medição da frequência cardíaca do jogador.
 
- A placa foi conectada à um arduino, responsável por enviar um range de medições feitas pela placa e enviar para a serial do computador.

- A leitura da serial do computador foi realizada por uma aplicação em python, e repassar para uma aplicação em php.

- A aplicação do algoritmo para extração do BPM a partir do range de medidas da placas foi implementada em JS, também responsavél pela lógica de ajuste de velocidade da bolinha de pingpong.
