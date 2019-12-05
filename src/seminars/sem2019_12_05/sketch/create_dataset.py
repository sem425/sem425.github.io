import numpy as np

def create_dataset(loc1, loc2, s1, s2, P=0.5, NSamples=1000):
    toss = np.random.choice(2, NSamples, p=[P, 1 - P]) 
    n1 = toss.sum() # число решек
    G1 = np.random.normal(loc1, s1, size=(n1, 2))
    G2 = np.random.normal(loc2, s2, size=(NSamples - n1, 2))

    arr = np.zeros((NSamples, 3))
    arr[:, 0] = toss
    arr[toss == 1, 1:] = G1
    arr[toss == 0, 1:] = G2

    return arr
    
dataset = create_dataset((100,100), (200,200), 50, 70, NSamples=3000)

import json
with open('dataset.json', 'w') as f:
    json.dump([[cell for cell in row] for row in dataset], f, indent=2)
