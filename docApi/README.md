**@tlink/model-matrix**

***

# Predecessor Successor Matrix Table

The Predecessor Successor Matrix Table (commonly referred to as the
"matrix table") is used to define state transitions or changes in an
application. For example, if a decision table is used to create an
account, this matrix table can specify actions such as adding
transactions to that account.

The table is typically divided into two main parts: \* The **source
part**: which refers to the current state or existing data. \* The
**action part**: which defines the state changes or actions that should
be applied.

The matrix itself maps source states to the corresponding actions,
enabling a clear representation of how different inputs trigger
different outputs or changes.

## Table Layout

<figure>
<img src="images/model-matrix/table.jpg" alt="table" />
<figcaption>The Matrix Table</figcaption>
</figure>

This image illustrates the overall layout of a matrix table. It shows
the structure of the table without focusing on specific values.

<figure>
<img src="images/model-matrix/header.jpg" alt="header" />
<figcaption>The Header Parts</figcaption>
</figure>

The header areas (highlighted in red) define the meta information for
both rows and columns. These headers are critical as they determine how
the test cases are identified and processed.

<figure>
<img src="images/model-matrix/source.jpg" alt="source" />
<figcaption>The Source Part</figcaption>
</figure>

This portion of the table, usually located on the left, represents the
source data or current state of the application. The user can choose
which side of the table to designate as the source.

<figure>
<img src="images/model-matrix/actions.jpg" alt="actions" />
<figcaption>The Action Part</figcaption>
</figure>

Typically found on the right side, the action part specifies the state
changes or actions to be applied to the source. The matrix table maps
these actions to the corresponding source states, and the order of
execution is handled by the generator logic within the model.
