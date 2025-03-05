# **📌 Step 1: Define Training Parameters**

### 🔹 What’s Happening?

Before we start training, we need to set some **parameters** that will control how the training process works.

1️⃣ **Setting the Number of Iterations (`max_iters`)**

- Training happens in **steps** called iterations.
- We need to decide how many times we will update the model.
- If we set **too few**, the model won’t learn enough.
- If we set **too many**, the model might start memorizing instead of generalizing.
- For this training, we decide to run **10,000 iterations**.

```python
max_iters = 10000
```

2️⃣ **Setting the Learning Rate (`learning_rate`)**

- The model updates its **weights** (internal settings) at every step.
- The learning rate controls **how big these updates are**.
- If the updates are **too big**, the model jumps around and never stabilizes.
- If the updates are **too small**, the model learns **too slowly**.
- We choose a **small but effective learning rate** that allows the model to improve gradually.

```python
learning_rate = 3e-4
```

---

### **📌 Expected Outcome**

At this stage, there is **no visible output** because we are only setting values.  
Internally, the system now knows:

✅ **How many times to run the training loop**  
✅ **How much to adjust weights in each step**

The training process **is now configured** and ready to move forward.

# **📌 Step 2: Create the Optimizer**

### 🔹 What’s Happening?

Now that we have defined how long training will run and how much the model should adjust in each step, we need a **mechanism to update the model’s weights**. This is done using an **optimizer**.

1️⃣ **What is an Optimizer?**

- The model contains **trainable weights** (also called parameters).
- These weights **start with random values** and need to be adjusted based on how wrong the model’s predictions are.
- The **optimizer** is responsible for **adjusting these weights** after each training step.

2️⃣ **Choosing AdamW as the Optimizer**

- There are different types of optimizers in deep learning.
- We use **AdamW**, which is an improved version of the standard **Adam optimizer**.
- AdamW **adapts the learning rate for each parameter separately**, making training more stable.

3️⃣ **How the Optimizer Works**

- After each training step:
  1. The optimizer looks at the **gradients** (which tell us how wrong each weight is).
  2. It updates the weights **by moving them in the correct direction**.
  3. It **reduces the error** over time, making the model better at predicting text.

```python
optimizer = torch.optim.AdamW(model.parameters(), lr=learning_rate)
```

---

### **📌 Expected Outcome**

At this stage, the optimizer is **created but not yet used**.  
Internally, the system now knows:

✅ **Which optimizer will be used to update the model**  
✅ **How to adjust the weights to improve predictions**

The training process is now prepared to **fetch training data and start learning**.

# **📌 Step 3: Start the Training Loop**

### 🔹 What’s Happening?

Now that we have **set up the optimizer**, we can start **training** the model. This means the model will **go through the dataset multiple times**, gradually improving its ability to predict the next character.

1️⃣ **What is a Training Loop?**

- Training **doesn’t happen in a single step**.
- Instead, we **repeat the training process thousands of times** to allow the model to learn.
- Each cycle through the loop is called an **iteration**.

2️⃣ **How Many Times Do We Train?**

- We already defined **`max_iters = 10,000`**, so the model will update itself **10,000 times**.
- Each time the loop runs, the model gets **a little better** at predicting characters.

3️⃣ **What Happens Inside the Training Loop?**  
For each iteration, the model:

- **Fetches a small batch of training data**
- **Makes predictions**
- **Calculates how wrong it is**
- **Computes the adjustments needed**
- **Updates its internal weights**

This happens **over and over**, improving the model at each step.

---

### **📌 Expected Outcome**

At this stage, the training loop is **set up but has not yet started running**.  
Internally, the system now knows:

✅ **That training will repeat for 10,000 iterations**  
✅ **That each iteration will involve fetching data, making predictions, and updating weights**

The model is now **ready to start learning**.

# **📌 Step 4: Get a Training Batch**

### 🔹 What’s Happening?

Before the model can learn, it needs **examples to train on**. In each iteration of the training loop, we fetch a **small chunk of training data**. This is called a **batch**.

1️⃣ **Why Use a Batch Instead of the Whole Dataset?**

- Instead of training on the **entire dataset at once**, we train on **small sections of it at a time**.
- This makes training **faster** and allows the model to **generalize better**.
- A **batch** is simply a **subset of text characters** that the model sees at each step.

2️⃣ **What is Inside a Batch?**  
Each batch contains:

- **`xb` (Input Batch)** → A sequence of characters the model will learn from.
- **`yb` (Target Batch)** → The correct next character for each input character.

Example:

```python
xb = ['h', 'e', 'l']
yb = ['e', 'l', 'l'] # The next expected characters
```

- The model **sees `'h'`** and should predict **`'e'`**.
- The model **sees `'e'`** and should predict **`'l'`**.
- The model **sees `'l'`** and should predict **`'l'`**.

3️⃣ **How Does the Model Use This Data?**

- The model will use **`xb`** to make predictions.
- It will compare those predictions to **`yb`** (the correct answers).
- It will compute **how wrong it was** and adjust itself accordingly.

---

### **📌 Expected Outcome**

At this stage, the model is **receiving input data in small chunks**.  
Internally, the system now knows:

✅ **That training will happen in small steps using mini-batches**  
✅ **How to split the dataset into inputs (`xb`) and correct answers (`yb`)**  
✅ **That the model will learn character sequences by predicting the next character**

The training loop can now **start making predictions** using this data.

# **📌 Step 5: Forward Pass (Make Predictions)**

### 🔹 What’s Happening?

Now that the model has received a batch of training data, it will **try to predict the next character** for each input in `xb`.  
This is called the **forward pass**, where the model **processes the input and generates predictions**.

1️⃣ **What Happens in the Forward Pass?**

- The model takes **`xb` (input batch)** and **converts characters into numbers** using an **embedding table**.
- It then **looks up the corresponding vector representation** for each character.
- Finally, it **computes the logits** (raw prediction scores) for the next character.

2️⃣ **What Are Logits?**

- Logits are the **raw scores before applying softmax**.
- Each row of logits represents the model’s guess for what the next character should be.
- The higher the logit for a character, the **more confident** the model is about predicting it.

Example:

```python
xb = ['h', 'e', 'l']
logits =
[
[0.1, 0.5, 0.3, 0.1], # Prediction for 'h'
 [0.2, 0.1, 0.4, 0.3], # Prediction for 'e'
 [0.3, 0.2, 0.1, 0.4] # Prediction for 'l'
]
```

- The **first row** represents the predictions for **'h'**.
- The **second row** represents the predictions for **'e'**.
- The **third row** represents the predictions for **'l'**.

3️⃣ **How Does the Model Use These Predictions?**

- The model’s predictions **are not yet probabilities**.
- They will later be converted into **probabilities using softmax**.
- The model will then **compare these predictions to the correct answers (`yb`)** to measure how wrong it is.

---

### **📌 Expected Outcome**

At this stage, the model has:

✅ **Processed the input batch and generated predictions**  
✅ **Produced logits (raw prediction scores) for each input character**  
✅ **Prepared the output for further processing (loss calculation and backpropagation)**

The training loop can now **compare these predictions with the correct answers to compute loss**.

# **📌 Step 6: Compute Loss (How Wrong the Model Is)**

### 🔹 What’s Happening?

Now that the model has **made predictions**, we need to **measure how wrong those predictions are**.  
This is done using a **loss function**, which tells us **how far the predicted values are from the correct ones (`yb`)**.

1️⃣ **Why Do We Need to Compute Loss?**

- If the model’s predictions are **perfect**, the loss will be **low**.
- If the predictions are **bad**, the loss will be **high**.
- The **goal of training** is to **reduce this loss over time**, so the model makes **better predictions**.

2️⃣ **How Is Loss Calculated?**

- The model’s predictions (`logits`) are raw numbers and **not probabilities yet**.
- We apply **softmax** to convert these logits into **probabilities**.
- We then compare these probabilities to the **actual correct answer (`yb`)**.
- A mathematical function (cross-entropy loss) measures **how different they are**.

Example:

```python
logits =
[
[0.1, 0.5, 0.3, 0.1], # Prediction for 'h'
 [0.2, 0.1, 0.4, 0.3], # Prediction for 'e'
 [0.3, 0.2, 0.1, 0.4] # Prediction for 'l'
]

yb = ['e', 'l', 'l'] # Correct answers
```

- If the model predicted `'o'` instead of `'e'`, the loss would be **high**.
- If the model predicted `'e'` correctly, the loss would be **low**.

3️⃣ **What Happens After Computing Loss?**

- The loss **tells us how bad the model’s predictions were**.
- In the next step, we will **calculate how much each weight in the model contributed to this error**.
- This will allow us to **update the model’s weights in the correct direction** to improve it.

---

### **📌 Expected Outcome**

At this stage, the model has:

✅ **Converted logits into probabilities**  
✅ **Compared predictions with correct answers (`yb`)**  
✅ **Computed a single loss value that represents the model’s error**

The training loop can now **calculate how much each weight needs to change using backpropagation**.

# **📌 Step 7: Compute Gradients (Backpropagation)**

### 🔹 What’s Happening?

Now that we have calculated the **loss**, we need to determine **which weights caused the error** and **how much they should change**.  
This process is called **backpropagation**.

1️⃣ **Why Do We Need Gradients?**

- The model consists of **many weights** (numbers that control how it makes predictions).
- Some weights contribute **more to the error**, while others contribute **less**.
- We need to compute **how much each weight needs to change** to **reduce the error**.
- These weight adjustments are called **gradients**.

2️⃣ **How Are Gradients Computed?**

- The system **traces backward** from the loss to find **which weights were responsible** for the mistake.
- It calculates the **gradient for each weight** → A small number that tells the model **how much to increase or decrease that weight**.
- These gradients are **stored inside each weight parameter** in the model.

Example:  
Imagine the model predicted **"o" instead of "e"**, causing a **high loss**.  
The system traces back and finds:

Weight 1: **Contributed a lot to the error** → **Needs a big update**  
Weight 2: **Slightly wrong** → **Small update needed**  
Weight 3: **Mostly correct** → **Very small update**

```python
loss.backward()
```

3️⃣ **Where Are the Gradients Stored?**

- PyTorch **automatically calculates and stores gradients** for each weight.
- Every weight in the model now has a **gradient value** inside it.

To see the gradients, we can print:

```python
print(model.token_embedding_table.weight.grad)
```

---

### **📌 Expected Outcome**

At this stage, the model has:

✅ **Traced back the error to identify which weights caused it**  
✅ **Computed gradients for all trainable weights in the model**  
✅ **Stored these gradients inside each weight parameter**

The training loop can now **use these gradients to update the model’s weights in the next step**.

# **📌 Step 8: Update Weights Using Gradients**

### 🔹 What’s Happening?

Now that we have **computed the gradients**, we need to **update the model’s weights** to reduce future errors.  
This is done using **gradient descent**, where we slightly adjust each weight in the **opposite direction of the error**.

1️⃣ **Why Do We Update Weights?**

- The gradients **tell us how wrong each weight was**.
- We use this information to **correct the weights** so the model improves.
- Each weight is adjusted **slightly**, bringing the model closer to making correct predictions.

```python
optimizer.step()
```

2️⃣ **How Are Weights Updated?**

- Each weight in the model is updated using:

```python
  new_weight = old_weight - (learning_rate × gradient)
```

- If the gradient is **large**, the weight is adjusted **more**.
- If the gradient is **small**, the weight is adjusted **slightly**.
- The **learning rate** (`3e-4`) controls how much we adjust the weights.

3️⃣ **What Happens to the Model After This Update?**

- The weights are now **slightly better** than before.
- The model should now make **slightly better predictions**.
- After thousands of updates, the model will become **very good** at predicting text.

Gradient Descent is the mathematical technique we use to train neural networks.
It adjusts the weights of the model to reduce the loss and make better predictions.

It follows this formula:

$$
W_{\text{new}} = W_{\text{old}} - \alpha \times \frac{\partial \text{Loss}}{\partial W}
$$

---

### **📌 Expected Outcome**

At this stage, the model has:

✅ **Used the gradients to adjust all weights**  
✅ **Reduced its overall error slightly**  
✅ **Prepared itself for the next batch of training data**

The training loop will now **repeat this process thousands of times**, improving the model at each step.

# **📌 Step 9: Reset Gradients for the Next Iteration**

### 🔹 What’s Happening?

Now that we have **updated the model’s weights**, we need to **reset the gradients** before the next training step.  
This prevents **old gradients from accumulating**, which would cause incorrect updates in the next iteration.

1️⃣ **Why Do We Need to Reset Gradients?**

- PyTorch **automatically accumulates gradients** from previous training steps.
- If we don’t clear them, **the next batch’s gradients will be added to the old ones** instead of being freshly computed.
- This would **corrupt the weight updates**, making learning unstable.

2️⃣ **How Do We Reset Gradients?**

- We use a function that **clears all stored gradients** in the model.
- This ensures that in the next iteration, **gradients will be computed from scratch**.

```python
optimizer.zero_grad(set_to_none=True)
```

3️⃣ **What Happens After Resetting Gradients?**

- The model is now **clean and ready** for the next batch of training data.
- The training loop will now **repeat all previous steps** for a new batch, continuing to improve the model.

---

### **📌 Expected Outcome**

At this stage, the model has:

✅ **Cleared all old gradients from memory**  
✅ **Prevented gradient accumulation errors**  
✅ **Prepared for the next batch of training data**

The training loop will now start a **new iteration**, repeating all steps with fresh data.
