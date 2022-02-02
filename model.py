import torch
import torch.nn as nn
from PIL import Image
import matplotlib.pyplot as plt
import numpy as np


class Decoder(nn.Module):
    def __init__(self):
        super(Decoder, self).__init__()

        self.mapping_dim = 10

        self.conv_dim = 200

        self.conv = nn.Sequential(
            nn.ConvTranspose2d(50, self.conv_dim, kernel_size=3),
            nn.LayerNorm([3, 3]),

            nn.LeakyReLU(0.2),

            nn.ConvTranspose2d(self.conv_dim, self.conv_dim, kernel_size=5),
            nn.LayerNorm([7, 7]),

            nn.LeakyReLU(0.2),

            nn.ConvTranspose2d(self.conv_dim, self.conv_dim, kernel_size=5),
            nn.LayerNorm([11, 11]),

            nn.LeakyReLU(0.2),

            nn.ConvTranspose2d(self.conv_dim, self.conv_dim, kernel_size=5),
            nn.LayerNorm([15, 15]),

            nn.LeakyReLU(0.2),

            nn.ConvTranspose2d(self.conv_dim, self.conv_dim, kernel_size=5),
            nn.LayerNorm([19, 19]),

            nn.LeakyReLU(0.2),

            nn.ConvTranspose2d(self.conv_dim, self.conv_dim, kernel_size=5),
            nn.LayerNorm([23, 23]),

            nn.LeakyReLU(0.2),

            nn.ConvTranspose2d(self.conv_dim, self.conv_dim, kernel_size=5),
            nn.LayerNorm([27, 27]),

            nn.LeakyReLU(0.2),

            nn.ConvTranspose2d(self.conv_dim, self.conv_dim, kernel_size=4),
            nn.LayerNorm([30, 30]),

            nn.LeakyReLU(0.2),


            nn.ConvTranspose2d(self.conv_dim, self.conv_dim, kernel_size=3),
            nn.LayerNorm([32, 32]),

            nn.LeakyReLU(0.2),

            nn.Conv2d(self.conv_dim, self.conv_dim, kernel_size=3, padding=1, padding_mode='replicate'),
            nn.LayerNorm([32, 32]),

            nn.LeakyReLU(0.2),


            nn.Conv2d(self.conv_dim, 1, kernel_size=3, padding=1, padding_mode='replicate'),
            nn.Tanh(),
        )

    def forward(self, img):
        x1 = self.conv(img[:, :, None, None])

        return x1


def output2png(output):
    output = ((output+1)/2)*(255)  # denormalize
    output = np.round(output[0, :, :, :])
    plt.imshow(output.reshape(output.shape[-1], output.shape[-1]), cmap='gray', vmin=0, vmax=255)
    im = Image.fromarray(output.reshape(output.shape[-1], output.shape[-1]).astype('uint8'))
    im.save("output.png")


def run_model():
    model = Decoder()
    sd = torch.load('vae_decoder_sd.pt', map_location=torch.device('cpu'))  # loaded for cpu
    model.load_state_dict(sd)
    model.eval()
    # Sample noise
    sample_noise = torch.normal(0, 1, size=(1, 50))

    # Generate ouput
    output = model(sample_noise).detach().numpy()
    output2png(output)


def re_save_model():
    model = torch.load('vae_decoder', map_location=torch.device('cpu'))  # loaded for cpu
    model.eval()
    torch.save(model.state_dict(), 'vae_decoder_sd.pt')
    print(model.state_dict())


run_model()
