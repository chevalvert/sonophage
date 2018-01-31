#include <SPI.h>
#include <Pixy.h>

Pixy pixy;

void setup() {
  Serial.begin(9600);
  pixy.init();
}

void loop() {
  static unsigned int frameCount = 0;
  int j;
  uint16_t blocks;
  char buf[32];

  blocks = pixy.getBlocks();

  if (blocks) {
    frameCount++;
    if (frameCount % 10 == 0) {
      for (j = 0; j < blocks; j++) pixy.blocks[j].print();
    }
  }
}
